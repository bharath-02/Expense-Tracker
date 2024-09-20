import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import RecentTransactions from "./components/RecentTransactions";
import PieChartComponent from "./components/PieChartComponent";
import TopExpenses from "./components/TopExpenses";
import AddExpenseModal from "./modals/AddExpenseModal";
import AddIncomeModal from "./modals/AddIncomeModal";
import "./App.css";

Modal.setAppElement("#root");

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  // Load initial data from localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem("walletBalance") || 5000;
    const storedExpenses = localStorage.getItem("expenses") || 0;
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    setWalletBalance(Number(storedBalance));
    setExpenses(Number(storedExpenses));
    setTransactions(storedTransactions);
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
  };

  const closeIncomeModal = () => {
    setIsIncomeModalOpen(false);
  };

  const addIncome = (incomeAmount) => {
    const updatedBalance = walletBalance + incomeAmount;

    setWalletBalance(updatedBalance);

    // Persist updated balance to localStorage
    localStorage.setItem("walletBalance", updatedBalance);

    closeIncomeModal();
  };

  // Function to handle adding a new expense
  const addOrEditExpense = (title, amount, category, date) => {
    let updatedTransactions;
    let updatedExpenses = expenses;
    let updatedBalance = walletBalance;

    if (editingTransaction !== null && editingTransaction !== undefined) {
      updatedTransactions = transactions.map((transaction, index) =>
        index === editingTransaction
          ? { ...transaction, title, amount: Number(amount), category, date }
          : transaction
      );

      const originalAmount = transactions[editingTransaction].amount;
      updatedExpenses = expenses - originalAmount + Number(amount);
      updatedBalance = walletBalance + originalAmount - Number(amount);
    } else {
      const newTransaction = {
        title,
        amount: Number(amount),
        category,
        date,
      };

      updatedTransactions = [...transactions, newTransaction];
      updatedExpenses = expenses + Number(amount);
      updatedBalance = walletBalance - Number(amount);
    }

    setTransactions(updatedTransactions);
    setExpenses(updatedExpenses);
    setWalletBalance(updatedBalance);

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    localStorage.setItem("expenses", updatedExpenses);
    localStorage.setItem("walletBalance", updatedBalance);

    closeModal();
  };

  const deleteTransaction = (index) => {
    const deletedTransaction = transactions[index];
    const updatedTransactions = transactions.filter(
      (transaction, i) => i !== index
    );
    const updatedExpenses = expenses - deletedTransaction.amount;
    const updatedBalance = walletBalance + deletedTransaction.amount;

    setTransactions(updatedTransactions);
    setExpenses(updatedExpenses);
    setWalletBalance(updatedBalance);

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    localStorage.setItem("expenses", updatedExpenses);
    localStorage.setItem("walletBalance", updatedBalance);
  };

  const editTransaction = (index) => {
    const transactionToEdit = transactions[index];
    setEditingTransaction(index);
    openModal();
  };

  return (
    <div className="expense-tracker-container">
      <h1 className="expense-tracker-header">Expense Tracker</h1>

      <div className="wallet-expense-section">
        {/* Wallet Balance Section */}
        <div className="wallet-balance">
          <p>Wallet Balance: ₹{walletBalance}</p>
          <button className="add-income-btn" onClick={openIncomeModal}>
            + Add Income
          </button>
        </div>

        {/* Expenses Section */}
        <div className="expenses">
          <p>Expenses: ₹{expenses}</p>
          <button className="add-expense-btn" onClick={openModal}>
            + Add Expense
          </button>
        </div>

        <PieChartComponent transactions={transactions} />
      </div>
      <div className="transactions-expenses-section">
        <RecentTransactions
          transactions={currentTransactions}
          onDelete={deleteTransaction}
          onEdit={editTransaction}
          transactionsPerPage={transactionsPerPage}
          totalTransactions={transactions.length}
          currentPage={currentPage}
          paginate={paginate}
        />
        <TopExpenses transactions={transactions} />
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add/Edit Expense Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <AddExpenseModal
          onClose={closeModal}
          onSubmit={addOrEditExpense}
          editingTransaction={
            editingTransaction !== null
              ? transactions[editingTransaction]
              : null
          }
        />
      </Modal>

      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={closeIncomeModal}
        contentLabel="Add Income Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <AddIncomeModal onClose={closeIncomeModal} onSubmit={addIncome} />
      </Modal>
    </div>
  );
};

export default App;
