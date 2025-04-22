class BudgetTracker {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.form = document.getElementById('transactionForm');
        this.list = document.getElementById('transactionList');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.addTransaction.bind(this));
        this.render();
    }

    addTransaction(e) {
        e.preventDefault();
        
        const transaction = {
            id: Date.now(),
            title: document.getElementById('title').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value
        };

        this.transactions.push(transaction);
        this.saveData();
        this.render();
        this.form.reset();
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveData();
        this.render();
    }

    calculateSummary() {
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income,
            expense,
            balance: income - expense
        };
    }

    saveData() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    render() {
        // Clear existing transactions
        this.list.innerHTML = '';

        // Render transactions
        this.transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.className = `transaction-item ${transaction.type}`;
            li.innerHTML = `
                <span>${transaction.title}</span>
                <div>
                    <span>KES ${transaction.amount.toFixed(2)}</span>
                    <button class="delete-btn" onclick="budgetTracker.deleteTransaction(${transaction.id})">×</button>
                </div>
            `;
            this.list.appendChild(li);
        });

        // Update summary
        const { balance, income, expense } = this.calculateSummary();
        document.getElementById('balance').textContent = `KES ${balance.toFixed(2)}`;
        document.getElementById('income').textContent = `KES ${income.toFixed(2)}`;
        document.getElementById('expense').textContent = `KES ${expense.toFixed(2)}`;
    }
}

// Initialize app
const budgetTracker = new BudgetTracker();