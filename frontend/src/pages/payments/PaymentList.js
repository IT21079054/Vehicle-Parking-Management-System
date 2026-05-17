import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { getPayments, createPayment, updatePayment, deletePayment } from '../../api/api';

const empty = { vehicleNumber: '', amount: '', paymentDate: '', paymentMethod: 'Cash' };

const methodStyle = {
  Cash:   { bg: '#fffbeb', color: '#f59e0b' },
  Card:   { bg: '#eff2ff', color: '#4361ee' },
  Online: { bg: '#ecfdf5', color: '#10b981' },
};

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const load = () => getPayments().then((r) => setPayments(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setErrors({}); setModal('add'); };
  const openEdit = (p) => { setForm(p); setErrors({}); setEditId(p.id); setModal('edit'); };
  const closeModal = () => { setModal(null); setEditId(null); setErrors({}); };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.vehicleNumber.trim()) e.vehicleNumber = 'Vehicle number is required.';
    if (!form.amount) e.amount = 'Amount is required.';
    else if (Number(form.amount) <= 0) e.amount = 'Amount must be greater than 0.';
    if (!form.paymentDate) e.paymentDate = 'Payment date is required.';
    else {
      const today = new Date().toISOString().split('T')[0];
      if (form.paymentDate > today) e.paymentDate = 'Date cannot be in the future.';
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const action = modal === 'add' ? createPayment(form) : updatePayment(editId, form);
    action.then(() => { closeModal(); load(); });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this payment?')) deletePayment(id).then(load);
  };

  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  const F = ({ name }) => errors[name]
    ? <div className="err-msg"><i className="bi bi-exclamation-circle"></i>{errors[name]}</div>
    : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><i className="bi bi-cash-coin me-2" style={{ color: '#f59e0b' }}></i>Payments</div>
          <div className="page-subtitle">
            {payments.length} records · Total: <strong style={{ color: '#10b981' }}>Rs. {total.toLocaleString()}</strong>
          </div>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg"></i> Add Payment
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr><th>#</th><th>Vehicle Number</th><th>Amount</th><th>Date</th><th>Method</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr><td colSpan="6"><div className="table-empty"><i className="bi bi-cash-stack"></i><p>No payments found.</p></div></td></tr>
            ) : payments.map((p, i) => {
              const ms = methodStyle[p.paymentMethod] || methodStyle.Cash;
              return (
                <tr key={p.id}>
                  <td style={{ color: '#cbd5e1', fontWeight: 600 }}>{i + 1}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{p.vehicleNumber}</td>
                  <td style={{ fontWeight: 700, color: '#10b981' }}>Rs. {Number(p.amount).toLocaleString()}</td>
                  <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{p.paymentDate}</td>
                  <td><span className="pill" style={{ background: ms.bg, color: ms.color }}>{p.paymentMethod}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon-edit" onClick={() => openEdit(p)}><i className="bi bi-pencil-fill"></i></button>
                      <button className="btn-icon-del" onClick={() => handleDelete(p.id)}><i className="bi bi-trash-fill"></i></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add New Payment' : 'Edit Payment'} onClose={closeModal} onSubmit={handleSubmit}
          submitLabel={modal === 'add' ? 'Add Payment' : 'Update Payment'}>
          <div className="form-row">
            <label className="form-label">Vehicle Number *</label>
            <input className={`form-input${errors.vehicleNumber ? ' error' : ''}`} name="vehicleNumber"
              value={form.vehicleNumber} onChange={handleChange} placeholder="e.g. WP CAA-1234" />
            <F name="vehicleNumber" />
          </div>
          <div className="form-row">
            <label className="form-label">Amount (Rs.) *</label>
            <input type="number" className={`form-input${errors.amount ? ' error' : ''}`} name="amount"
              value={form.amount} onChange={handleChange} placeholder="0.00" min="1" />
            <F name="amount" />
          </div>
          <div className="form-row">
            <label className="form-label">Payment Date *</label>
            <input type="date" className={`form-input${errors.paymentDate ? ' error' : ''}`} name="paymentDate"
              value={form.paymentDate} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
            <F name="paymentDate" />
          </div>
          <div className="form-row">
            <label className="form-label">Payment Method *</label>
            <select className="form-select-input" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option>Cash</option>
              <option>Card</option>
              <option>Online</option>
            </select>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PaymentList;
