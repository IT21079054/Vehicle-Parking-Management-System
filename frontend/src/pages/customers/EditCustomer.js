import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomer, updateCustomer } from '../../api/api';

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: '', nic: '', contactNumber: '', address: '' });

  useEffect(() => { getCustomer(id).then((res) => setForm(res.data)); }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomer(id, form).then(() => navigate('/customers'));
  };

  return (
    <div>
      <div className="page-header">
        <h4><i className="bi bi-pencil-fill me-2" style={{ color: '#7209b7' }}></i>Edit Customer</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/customers')}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input className="form-control" name="customerName" value={form.customerName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">NIC Number</label>
            <input className="form-control" name="nic" value={form.nic} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input className="form-control" name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Address</label>
            <textarea className="form-control" name="address" value={form.address} onChange={handleChange} rows={3} required />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn-save">
              <i className="bi bi-check-lg me-1"></i>Update Customer
            </button>
            <button type="button" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}
              onClick={() => navigate('/customers')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
