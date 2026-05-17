import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../../api/api';

function AddCustomer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: '', nic: '', contactNumber: '', address: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createCustomer(form).then(() => navigate('/customers'));
  };

  return (
    <div>
      <div className="page-header">
        <h4><i className="bi bi-plus-circle-fill me-2" style={{ color: '#7209b7' }}></i>Add Customer</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/customers')}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input className="form-control" name="customerName" value={form.customerName}
              onChange={handleChange} placeholder="Full name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">NIC Number</label>
            <input className="form-control" name="nic" value={form.nic}
              onChange={handleChange} placeholder="e.g. 200012345678" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input className="form-control" name="contactNumber" value={form.contactNumber}
              onChange={handleChange} placeholder="e.g. 0771234567" required />
          </div>
          <div className="mb-4">
            <label className="form-label">Address</label>
            <textarea className="form-control" name="address" value={form.address}
              onChange={handleChange} rows={3} placeholder="Full address" required />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn-save">
              <i className="bi bi-check-lg me-1"></i>Save Customer
            </button>
            <button type="button" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}
              onClick={() => navigate('/customers')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
