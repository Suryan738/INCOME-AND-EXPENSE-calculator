let entries = JSON.parse(localStorage.getItem('entries')) || [];
const entryList = document.getElementById('entryList');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpensesEl = document.getElementById('totalExpenses');
const netBalanceEl = document.getElementById('netBalance');

function updateDisplay() {
    entryList.innerHTML = '';
    let totalIncome = 0;
    let totalExpenses = 0;

    entries.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `${entry.description} - $${entry.amount} <button onclick="editEntry(${entry.id})">Edit</button> <button onclick="deleteEntry(${entry.id})">Delete</button>`;
        entryList.appendChild(li);

        if (entry.type === 'income') {
            totalIncome += entry.amount;
        } else {
            totalExpenses += entry.amount;
        }
    });

    totalIncomeEl.textContent = totalIncome;
    totalExpensesEl.textContent = totalExpenses;
    netBalanceEl.textContent = totalIncome - totalExpenses;
}

document.getElementById('addEntry').onclick = function() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const id = new Date().getTime(); // unique id

    if (description && !isNaN(amount)) {
        entries.push({ id, description, amount, type });
        localStorage.setItem('entries', JSON.stringify(entries));
        updateDisplay();
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    }
};

function editEntry(id) {
    const entry = entries.find(e => e.id === id);
    document.getElementById('description').value = entry.description;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('type').value = entry.type;
    deleteEntry(id);
}

function deleteEntry(id) {
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem('entries', JSON.stringify(entries));
    updateDisplay();
}

// Initial display
updateDisplay();
