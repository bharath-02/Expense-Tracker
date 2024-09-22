import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./RecentTransactions.css";

const RecentTransactions = ({
  transactions,
  onDelete,
  onEdit,
  transactionsPerPage,
  totalTransactions,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="transactions-container">
      <h2 className="section-title">Recent Transactions</h2>

      {/* Transaction List */}
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p className="empty-list">No transactions available</p>
        ) : (
          transactions.map((transaction, index) => (
            <div className="transaction-card" key={index}>
              <div className="transaction-info">
                <span className="transaction-icon">💸</span>
                <div>
                  <h3 className="transaction-title">{transaction.title}</h3>
                  <p className="transaction-date">{transaction.date}</p>
                </div>
              </div>
              <div className="transaction-amount">₹{transaction.amount}</div>
              <div className="transaction-actions">
                <button className="edit-btn" onClick={() => onEdit(index)}>
                  ✏️
                </button>
                <button className="delete-btn" onClick={() => onDelete(index)}>
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
        <nav className="pagination-nav">
          <ul className="pagination">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="arrow-btn"
              >
                <FaArrowLeft />
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                className="arrow-btn"
              >
                <FaArrowRight />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default RecentTransactions;
