const expenseInput = document.getElementById("expenseInput") as HTMLInputElement;
const amountInput = document.getElementById("amountInput") as HTMLInputElement;
const categoryInput = document.getElementById("categoryInput") as HTMLSelectElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const expenseList = document.getElementById("expenseList") as HTMLUListElement;
const totalText = document.getElementById("totalText") as HTMLHeadingElement;
const errorText = document.getElementById("errorText") as HTMLParagraphElement;
const message = document.getElementById("message") as HTMLParagraphElement;

interface Expense {
    id: number,
    title: string;
    amount: number;
    category: string
}
let expenses : Expense[] = [];

window.addEventListener("DOMContentLoaded", () => {
    loadExpense();
});

addBtn.addEventListener("click", addExpense);

function addExpense() : void{
    const title = expenseInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    if(title === "" && amount <= 0){
        errorText.textContent = "Please fill all fields correctly";
        return;
    }

    const newExpense: Expense = {
        id: Date.now(),
        title: title,
        amount: amount,
        category: category
    }

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
function renderExpenses() : void{
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
};

function updateTotal() : void{
    const total = expenses.reduce((sum, expense) => (
        sum + expense.amount
    ), 0);

    totalText.textContent = `Total: ₦${total.toLocaleString()}`;
}

function deleteEvent(): void{
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number((button as HTMLButtonElement).dataset.id);
            deleteExpense(id);
        });
    })
}

//delete expense button
function deleteExpense(id:number) : void{

    const deletedExpense = expenses.find(expense => expense.id === id);
    expenses = expenses.filter(expense => expense.id !== id);

    showMessage(`${deletedExpense?.title} was deleted`);

    //save expense
    saveExpense();

    //render expenses
    renderExpenses();
}

//save expenses to localStorage
function saveExpense() :void{
    localStorage.setItem("expenses", JSON.stringify(expenses))
}

//load from localStorage
function loadExpense() : void{
    const savedExpense = localStorage.getItem("expenses");

    if(savedExpense){
        expenses = JSON.parse(savedExpense);
        renderExpenses();
    }
}

//clear all input
function clearInputs(): void{
    expenseInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";
}

//alert when an item is added or deleted
function showMessage(text: string): void{
    message.textContent = text;
    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);

}