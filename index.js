const bankAccount = {
  balance: 0,
  transactions: [],
  deposit: function (money) {
    if (money > 0) {
      this.balance += money;
      this.transactions.push({
        type: "Deposit",
        amount: money,
        balance: this.balance,
        date:new Date()
      });
    }
    this.updateBalance();
  },
  withdraw: function (money) {
    const errorMessage = document.querySelector("#error-message");
    const ok = document.querySelector("#ok");
    const fon=document.querySelector("#fon")
    if (money > 0 && money <= this.balance) {
      this.balance -= money;
      this.transactions.push({
        type: "Withdraw",
        amount: money,
        balance: this.balance,
        date:new Date()
      });
    } else {
      errorMessage.style.display = "block";
      fon.style.display="block"
      ok.onclick = () => {
          errorMessage.style.display = "none"
          fon.style.display="none"
      };
    }
    this.updateBalance();
  },
  updateBalance: function () {
    const balanceEl = document.querySelector("#balance");
    balanceEl.innerHTML = this.balance;

    const transactions = document.querySelector("#transaction tbody");
    transactions.innerHTML = this.transactions
      .map((el) => {
        const time=el.date
        const day=time.getDate()
        const month=time.getMonth()+1
        const year=time.getFullYear()
        const fulltime=`${day}.${month}.${year}`
        
        return ` <tr>
             <td>${el.type}</td>
             <td>${el.amount}</td>
             <td>${el.balance}</td>
             <td>${fulltime}</td>
           </tr>
           `;
      })
      .join("");
  },
};

const depositEl = document.querySelector("#deposit");
const withdrawEl = document.querySelector("#withdraw");
const depositBtnEl = document.querySelector("#depositBtn");
const withdrawBtnEl = document.querySelector("#withdrawBtn");

depositBtnEl.onclick = () => {
  const depositAmount = Number(depositEl.value);
  bankAccount.deposit(depositAmount);
  depositEl.value = "";
};
withdrawBtnEl.onclick = () => {
  const withdrawAmount = Number(withdrawEl.value);
  bankAccount.withdraw(withdrawAmount);
  withdrawEl.value = "";
};
