import React from "react";
import "./RecentTransactions.css"; // External CSS for transactions

const RecentTransactions = ({ transactions, onDelete, onEdit }) => {
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
      </div>
    </div>
  );
};

export default RecentTransactions;
