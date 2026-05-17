import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPayment, updatePayment } from '../../api/api';

function EditPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ vehicleNumber: '', amount: '', paymentDate: '', paymentMethod: 'Cash' });

  useEffect(() => { getPayment(id).then((res) => setForm(res.data)); }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePayment(id, form).then(() => navigate('/payments'));
  };

  return (
    <div>
      <div className="page-header">
        <h4><i className="bi bi-pencil-fill me-2" style={{ color: '#f77f00' }}></i>Edit Payment</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/payments')}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Vehicle Number</label>
            <input className="form-control" name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount (Rs.)</label>
            <input type="number" className="form-control" name="amount" value={form.amount} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Payment Date</label>
            <input type="date" className="form-control" name="paymentDate" value={form.paymentDate} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Payment Method</label>
            <select className="form-select" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option>Cash</option>
              <option>Card</option>
              <option>Online</option>
            </select>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn-save">
              <i className="bi bi-check-lg me-1"></i>Update Payment
            </button>
            <button type="button" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}
              onClick={() => navigate('/payments')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPayment;
