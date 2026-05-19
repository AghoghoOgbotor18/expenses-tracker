"use strict";
const expenseInput = document.getElementById("expenseInput");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalText = document.getElementById("totalText");
const errorText = document.getElementById("errorText");
const message = document.getElementById("message");
let expenses = [];
window.addEventListener("DOMContentLoaded", () => {
    loadExpense();
});
//alert when an item is added or deleted
function showMessage(text) {
    message.textContent = text;
    message.classList.add("show");
    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);
}
addBtn.addEventListener("click", addExpense);
function addExpense() {
    const title = expenseInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    if (title === "" && amount <= 0) {
        errorText.textContent = "Please fill all fields correctly";
        return;
    }
    const newExpense = {
        id: Date.now(),
        title: title,
        amount: amount,
        category: category
    };
    expenses.push(newExpense);
    showMessage(`${title} was added`);
    errorText.textContent = "";
    //save to localStorage
    saveExpense();
    //render expenses
    renderExpenses();
    //clear all input
    clearInputs();
}
//render function
function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="expense-content">
                <div>
                    <h3>${expense.title}</h3>
                    <p>${expense.category}</p>
                </div>

                <div class="right-section">
                    <span>
                        ₦${expense.amount.toLocaleString()}
                    </span>
                    <button class="delete-btn" data-id="${expense.id}">
                        Delete
                    </button>
                </div>
            </div>
        `;
        expenseList.appendChild(li);
    });
    //update the total
    updateTotal();
    //add delete event
    deleteEvent();
}
;
function updateTotal() {
    const total = expenses.reduce((sum, expense) => (sum + expense.amount), 0);
    totalText.textContent = `Total: ₦${total.toLocaleString()}`;
}
function deleteEvent() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            deleteExpense(id);
        });
    });
}
//delete expense button
function deleteExpense(id) {
    const deletedExpense = expenses.find(expense => expense.id === id);
    expenses = expenses.filter(expense => expense.id !== id);
    showMessage(`${deletedExpense?.title} was deleted`);
    //save expense
    saveExpense();
    //render expenses
    renderExpenses();
}
//save expenses to localStorage
function saveExpense() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
//load from localStorage
function loadExpense() {
    const savedExpense = localStorage.getItem("expenses");
    if (savedExpense) {
        expenses = JSON.parse(savedExpense);
        renderExpenses();
    }
}
//clear all input
function clearInputs() {
    expenseInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";
}
