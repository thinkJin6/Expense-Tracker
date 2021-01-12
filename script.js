const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money--plus');
const moneyMinus = document.getElementById('money--minus');
const historyList = document.getElementById('list');
const transactionForm = document.querySelector('.form');
const inputText = document.getElementById('text');
const inputAmount = document.getElementById('amount');
const btnDelete = document.querySelector('.btn--delete');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

console.log(JSON.parse(localStorage.getItem('transactions')));

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
const addTransaction = function (e) {
  e.preventDefault();
  // Generate random ID
  const randomID = Math.trunc(Math.random() * 1000000);

  const transaction = {
    id: randomID,
    text: inputText.value,
    amount: +inputAmount.value,
  };

  console.log(transaction);

  if (inputText.value === '' || inputAmount === '')
    alert('Please add a text and amount');

  transactions.push(transaction);

  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();
  inputText.value = '';
  inputAmount.value = '';
};

// Add transactions to DOM list
const addTransactionDOM = function (transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text}
  <span>${sign}$${Math.abs(transaction.amount)}</span> 
   <button class="btn--delete" onclick="removeTransaction(${
     transaction.id
   })">x</button>`;

  historyList.append(item);
};

// Update the balance, income and expense
const updateValues = function () {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense} `;
};

// Remove transaction by id
const removeTransaction = function (id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};

// Update local storage function
const updateLocalStorage = function () {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Init App
const init = function () {
  historyList.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

transactionForm.addEventListener('submit', addTransaction);
