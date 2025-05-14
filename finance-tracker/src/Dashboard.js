import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    type: "income",
    amount: "",
    category: "",
    date: "",
  });
  const [theme, setTheme] = useState("light"); // State for theme

  const COLORS = ["#4caf50", "#f44336", "#ffc107", "#2196f3"];

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({ type: "income", amount: "", category: "", date: "" });
  };

  const calculateTotal = (type) =>
    transactions
      .filter((transaction) => transaction.type === type)
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const getCategoryData = () => {
    const categories = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
      return acc;
    }, {});
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button className={`theme-toggle-btn ${theme}`} onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>
      <p className="dashboard-welcome">Welcome to your personal finance tracker!</p>

      {/* Overview, Form, Transactions, and Charts Sections */}
      <div className="overview">
        <h3>Overview</h3>
        <div className="overview-card">
          <p>Monthly Income: <span>${calculateTotal("income")}</span></p>
          <p>Monthly Expenses: <span>${calculateTotal("expense")}</span></p>
          <p>Savings Goal Progress: <span>0%</span></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





