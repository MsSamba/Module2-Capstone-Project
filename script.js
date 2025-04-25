//   Budget App Logic
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
    
        const title = document.getElementById('title').value.trim();
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;
    
        if (!title || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid title and a positive amount.');
            return;
        }
    
        // Check if expense would make balance negative
        const { balance } = this.calculateSummary();
        if (type === 'expense' && amount > balance) {
            alert('Transaction denied: Expense exceeds current balance.');
            return;
        }
         
        const transaction = {
            id: Date.now(),
            title,
            amount,
            type
        };
    
        this.transactions.push(transaction);
        this.saveData();
        this.render();
        this.form.reset();
    }
    

    deleteTransaction(id) {
        if (confirm("Are you sure you want to delete this transaction?"))
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
            balance: income - expense,
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

