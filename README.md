# 💸 Expense Journal App

A modern and responsive Expense Tracker built with HTML, CSS, and TypeScript.

This application allows users to add, track, and delete expenses while automatically calculating total spending. Data is saved using Local Storage, so expenses remain even after refreshing the page.

---

##  Features

-  Add expenses
-  Delete expenses
-  Save data with Local Storage
-  Automatically calculate total expenses
-  Dynamic notifications using `setTimeout`
-  Nigerian Naira currency formatting
-  Modern responsive UI
-  Mobile-friendly layout

---

## 🛠️ Built With

- HTML5
- CSS3
- TypeScript

---

## 📂 Project Structure

```bash
├── index.html
├── style.css
├── app.ts
├── app.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

### 2. Open the project

Open the folder in VS Code or any code editor.

---

### 3. Compile TypeScript

Run:

```bash
tsc app.ts
```

This converts TypeScript into JavaScript.

---

### 4. Run the project

Open `index.html` using Live Server.

---

## 📚 What I Learned

This project helped me practice and understand:

- TypeScript interfaces
- Arrays of objects
- DOM manipulation
- Event listeners
- Dynamic rendering
- Local Storage
- CRUD operations
- `setTimeout()`
- `.filter()`
- `.reduce()`
- Currency formatting with `toLocaleString()`

---

##  Key Concepts Used

### Local Storage

Expenses are stored in the browser using:

```typescript
localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
);
```

---

### Dynamic Rendering

Expenses are dynamically rendered using loops and DOM manipulation.

---

### Total Calculation

The total expense amount is calculated using `.reduce()`.

---

##  Future Improvements

- Expense charts
- Expense categories filter
- Dark/light mode toggle
- Edit expense feature
- Monthly analytics
- Search functionality

---

##  Author

Built by Aghogho Ogbotor as part of my TypeScript learning journey.
