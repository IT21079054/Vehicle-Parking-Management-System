import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../api/api';

const empty = { customerName: '', nic: '', contactNumber: '', address: '' };

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const load = () => getCustomers().then((r) => setCustomers(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setErrors({}); setModal('add'); };
  const openEdit = (c) => { setForm(c); setErrors({}); setEditId(c.id); setModal('edit'); };
  const closeModal = () => { setModal(null); setEditId(null); setErrors({}); };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Customer name is required.';
    else if (form.customerName.trim().length < 2) e.customerName = 'Name must be at least 2 characters.';
    else if (!/^[A-Za-z\s]+$/.test(form.customerName)) e.customerName = 'Name can only contain letters.';

    if (!form.nic.trim()) e.nic = 'NIC is required.';
    else if (!/^([0-9]{9}[VvXx]|[0-9]{12})$/.test(form.nic)) e.nic = 'Enter a valid NIC (e.g. 200012345678 or 990123456V).';

    if (!form.contactNumber.trim()) e.contactNumber = 'Contact number is required.';
    else if (!/^0[0-9]{9}$/.test(form.contactNumber)) e.contactNumber = 'Enter a valid 10-digit number (e.g. 0771234567).';

    if (!form.address.trim()) e.address = 'Address is required.';
    else if (form.address.trim().length < 5) e.address = 'Please enter a full address.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const action = modal === 'add' ? createCustomer(form) : updateCustomer(editId, form);
    action.then(() => { closeModal(); load(); });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this customer?')) deleteCustomer(id).then(load);
  };

  const avatarColor = (name) => {
    const colors = ['#4361ee', '#10b981', '#f59e0b', '#7209b7', '#ef4444', '#0ea5e9'];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const F = ({ name }) => errors[name]
    ? <div className="err-msg"><i className="bi bi-exclamation-circle"></i>{errors[name]}</div>
    : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><i className="bi bi-people-fill me-2" style={{ color: '#7209b7' }}></i>Customers</div>
          <div className="page-subtitle">{customers.length} customers registered</div>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg"></i> Add Customer
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr><th>#</th><th>Customer Name</th><th>NIC</th><th>Contact</th><th>Address</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr><td colSpan="6"><div className="table-empty"><i className="bi bi-people"></i><p>No customers found.</p></div></td></tr>
            ) : customers.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: '#cbd5e1', fontWeight: 600 }}>{i + 1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="avatar" style={{ background: avatarColor(c.customerName) }}>
                      {c.customerName.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{c.customerName}</span>
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#64748b' }}>{c.nic}</td>
                <td>{c.contactNumber}</td>
                <td style={{ color: '#94a3b8', fontSize: '0.82rem', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.address}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon-edit" onClick={() => openEdit(c)}><i className="bi bi-pencil-fill"></i></button>
                    <button className="btn-icon-del" onClick={() => handleDelete(c.id)}><i className="bi bi-trash-fill"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add New Customer' : 'Edit Customer'} onClose={closeModal} onSubmit={handleSubmit}
          submitLabel={modal === 'add' ? 'Add Customer' : 'Update Customer'}>
          <div className="form-row">
            <label className="form-label">Customer Name *</label>
            <input className={`form-input${errors.customerName ? ' error' : ''}`} name="customerName"
              value={form.customerName} onChange={handleChange} placeholder="Full name" />
            <F name="customerName" />
          </div>
          <div className="form-row">
            <label className="form-label">NIC Number *</label>
            <input className={`form-input${errors.nic ? ' error' : ''}`} name="nic"
              value={form.nic} onChange={handleChange} placeholder="e.g. 200012345678 or 990123456V" />
            <F name="nic" />
          </div>
          <div className="form-row">
            <label className="form-label">Contact Number *</label>
            <input className={`form-input${errors.contactNumber ? ' error' : ''}`} name="contactNumber"
              value={form.contactNumber} onChange={handleChange} placeholder="e.g. 0771234567" />
            <F name="contactNumber" />
          </div>
          <div className="form-row">
            <label className="form-label">Address *</label>
            <textarea className={`form-textarea${errors.address ? ' error' : ''}`} name="address"
              value={form.address} onChange={handleChange} placeholder="Full address" />
            <F name="address" />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CustomerList;
