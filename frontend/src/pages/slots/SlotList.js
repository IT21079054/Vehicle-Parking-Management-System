import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { getSlots, createSlot, updateSlot, deleteSlot } from '../../api/api';

const empty = { slotNumber: '', slotStatus: 'Available' };

function SlotList() {
  const [slots, setSlots] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const load = () => getSlots().then((r) => setSlots(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setErrors({}); setModal('add'); };
  const openEdit = (s) => { setForm(s); setErrors({}); setEditId(s.id); setModal('edit'); };
  const closeModal = () => { setModal(null); setEditId(null); setErrors({}); };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.slotNumber.trim()) e.slotNumber = 'Slot number is required.';
    else if (!/^[A-Za-z0-9-]+$/.test(form.slotNumber)) e.slotNumber = 'Only letters, numbers and hyphens allowed (e.g. A-01).';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const action = modal === 'add' ? createSlot(form) : updateSlot(editId, form);
    action.then(() => { closeModal(); load(); });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this slot?')) deleteSlot(id).then(load);
  };

  const available = slots.filter((s) => s.slotStatus === 'Available').length;
  const occupied = slots.length - available;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><i className="bi bi-grid-3x3-gap-fill me-2" style={{ color: '#10b981' }}></i>Parking Slots</div>
          <div className="page-subtitle">
            <span style={{ color: '#10b981' }}>{available} available</span>{' · '}
            <span style={{ color: '#ef4444' }}>{occupied} occupied</span>
          </div>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg"></i> Add Slot
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr><th>#</th><th>Slot Number</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {slots.length === 0 ? (
              <tr><td colSpan="4"><div className="table-empty"><i className="bi bi-grid-3x3-gap"></i><p>No slots found.</p></div></td></tr>
            ) : slots.map((s, i) => (
              <tr key={s.id}>
                <td style={{ color: '#cbd5e1', fontWeight: 600 }}>{i + 1}</td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{s.slotNumber}</td>
                <td>
                  <span className={`pill ${s.slotStatus === 'Available' ? 'pill-green' : 'pill-red'}`}>
                    <i className={`bi ${s.slotStatus === 'Available' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i> {s.slotStatus}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon-edit" onClick={() => openEdit(s)}><i className="bi bi-pencil-fill"></i></button>
                    <button className="btn-icon-del" onClick={() => handleDelete(s.id)}><i className="bi bi-trash-fill"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add New Slot' : 'Edit Slot'} onClose={closeModal} onSubmit={handleSubmit}
          submitLabel={modal === 'add' ? 'Add Slot' : 'Update Slot'}>
          <div className="form-row">
            <label className="form-label">Slot Number *</label>
            <input className={`form-input${errors.slotNumber ? ' error' : ''}`} name="slotNumber"
              value={form.slotNumber} onChange={handleChange} placeholder="e.g. A-01" />
            {errors.slotNumber && <div className="err-msg"><i className="bi bi-exclamation-circle"></i>{errors.slotNumber}</div>}
          </div>
          <div className="form-row">
            <label className="form-label">Status *</label>
            <select className="form-select-input" name="slotStatus" value={form.slotStatus} onChange={handleChange}>
              <option>Available</option>
              <option>Occupied</option>
            </select>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SlotList;
