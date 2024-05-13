document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
  
    // Load expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Render expenses
    function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach(function(expense, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name}: $${expense.amount}</span>
          <button onclick="editExpense(${index})">Edit</button>
          <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
      });
      saveToLocalStorage();
    }
  
    // Add new expense
    expenseForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('expense-name').value;
      const amount = parseFloat(document.getElementById('expense-amount').value);
  
      if (name && amount) {
        expenses.push({ name, amount });
        renderExpenses();
        expenseForm.reset();
      } else {
        alert('Please enter both name and amount.');
      }
    });
  
    // Edit expense
    window.editExpense = function(index) {
      const newName = prompt('Enter new name for the expense:');
      const newAmount = parseFloat(prompt('Enter new amount:'));
      if (newName && !isNaN(newAmount)) {
        expenses[index].name = newName;
        expenses[index].amount = newAmount;
        renderExpenses();
      }
    };
  
    // Delete expense
    window.deleteExpense = function(index) {
      expenses.splice(index, 1);
      renderExpenses();
    };
  
    // Save to local storage
    function saveToLocalStorage() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    // Initial render
    renderExpenses();
  });
  