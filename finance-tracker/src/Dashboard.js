import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    type: "income",
    amount: "",
    category: "",
    date: "",
  });
  const [editIndex, setEditIndex] = useState(null); // Track the transaction being edited

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing transaction
      const updatedTransactions = transactions.map((transaction, index) =>
        index === editIndex ? newTransaction : transaction
      );
      setTransactions(updatedTransactions);
      setEditIndex(null);
    } else {
      // Add new transaction
      setTransactions([...transactions, newTransaction]);
    }
    setNewTransaction({ type: "income", amount: "", category: "", date: "" });
  };

  const handleEditTransaction = (index) => {
    setNewTransaction(transactions[index]);
    setEditIndex(index);
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const calculateTotal = (type) =>
    transactions
      .filter((transaction) => transaction.type === type)
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-welcome">Welcome to your personal finance tracker!</p>

      <div className="overview">
        <h3>Overview</h3>
        <div className="overview-card">
          <p>Monthly Income: <span>${calculateTotal("income")}</span></p>
          <p>Monthly Expenses: <span>${calculateTotal("expense")}</span></p>
          <p>Savings Goal Progress: <span>0%</span></p>
        </div>
      </div>

      <div className="transaction-form">
        <h3>{editIndex !== null ? "Edit Transaction" : "Add Transaction"}</h3>
        <form onSubmit={handleAddTransaction}>
          <div className="form-group">
            <label>Type:</label>
            <select
              value={newTransaction.type}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, type: e.target.value })
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              placeholder="Category"
              value={newTransaction.category}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  category: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  date: e.target.value,
                })
              }
              required
            />
          </div>
          <button className="submit-btn" type="submit">
            {editIndex !== null ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions yet!</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((transaction, index) => (
              <li key={index} className={`transaction-item ${transaction.type}`}>
                <span>{transaction.date}</span>: {transaction.type} of $
                {transaction.amount} ({transaction.category})
                <button
                  className="edit-btn"
                  onClick={() => handleEditTransaction(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTransaction(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


