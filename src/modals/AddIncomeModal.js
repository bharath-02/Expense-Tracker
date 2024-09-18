// AddIncomeModal.js
import React, { useState } from "react";
import "./AddIncomeModal.css"; // Add your custom styles here

const AddIncomeModal = ({ onClose, onSubmit }) => {
  const [income, setIncome] = useState("");

  const handleSubmit = () => {
    if (income) {
      onSubmit(Number(income)); // Call the parent function with the income value
    }
  };

  return (
    <div>
      <h2 className="modal-header">Add Income</h2>
      <div className="input-row">
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Income Amount"
          className="income-input"
        />
        <button onClick={handleSubmit} className="add-balance-btn">
          Add Balance
        </button>
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddIncomeModal;
