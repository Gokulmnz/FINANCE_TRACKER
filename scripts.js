document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('transaction-name').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const type = document.getElementById('transaction-type').value;

    addTransaction(name, amount, type);
    updateSummary();
    this.reset();
});

let transactions = [];

function addTransaction(name, amount, type) {
    const transaction = {
        name,
        amount,
        type,
        id: Date.now()
    };
    transactions.push(transaction);
    renderTransaction(transaction);
}

function renderTransaction(transaction) {
    const transactionList = document.getElementById('transactions');
    const transactionItem = document.createElement('li');
    transactionItem.textContent = `${transaction.name}: $${transaction.amount.toFixed(2)} (${transaction.type})`;
    transactionList.appendChild(transactionItem);
}

function updateSummary() {
    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    document.getElementById('total-income').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('total-expense').textContent = `$${totalExpense.toFixed(2)}`;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
}