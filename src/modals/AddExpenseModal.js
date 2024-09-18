import React, { useState, useEffect } from "react";
import "./AddExpenseModal.css";

const AddExpenseModal = ({ onClose, onSubmit, editingTransaction }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Prepopulate the form fields if editing a transaction
  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      // Reset the form when adding a new expense
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
  }, [editingTransaction]);

  const handleSubmit = () => {
    // Call the onSubmit function passed as a prop to add the expense
    if (title && amount && category && date) {
      onSubmit(title, amount, category, date);
    }
  };
  return (
    <div>
      <h2 className="modal-header">
        {editingTransaction ? "Edit Expense" : "Add Expenses"}
      </h2>
      <div className="modal-content">
        <div className="input-row">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="input-row">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            <option>Food</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Travel</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-buttons">
        <button className="add-btn" onClick={handleSubmit}>
          {editingTransaction ? "Save Changes" : "Add Expense"}
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddExpenseModal;
