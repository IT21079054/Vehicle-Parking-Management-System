import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../../api/api';

const empty = { vehicleNumber: '', vehicleType: 'Car', ownerName: '', contactNumber: '', entryTime: '' };

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const load = () => getVehicles().then((r) => setVehicles(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setErrors({}); setModal('add'); };
  const openEdit = (v) => { setForm(v); setErrors({}); setEditId(v.id); setModal('edit'); };
  const closeModal = () => { setModal(null); setEditId(null); setErrors({}); };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.vehicleNumber.trim()) e.vehicleNumber = 'Vehicle number is required.';
    else if (!/^[A-Za-z0-9\s-]+$/.test(form.vehicleNumber)) e.vehicleNumber = 'Only letters, numbers and hyphens allowed.';
    if (!form.ownerName.trim()) e.ownerName = 'Owner name is required.';
    else if (form.ownerName.trim().length < 2) e.ownerName = 'Name must be at least 2 characters.';
    if (!form.contactNumber.trim()) e.contactNumber = 'Contact number is required.';
    else if (!/^0[0-9]{9}$/.test(form.contactNumber)) e.contactNumber = 'Enter a valid 10-digit number (e.g. 0771234567).';
    if (!form.entryTime) e.entryTime = 'Entry time is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const action = modal === 'add' ? createVehicle(form) : updateVehicle(editId, form);
    action.then(() => { closeModal(); load(); });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this vehicle?')) deleteVehicle(id).then(load);
  };

  const F = ({ name }) => errors[name]
    ? <div className="err-msg"><i className="bi bi-exclamation-circle"></i>{errors[name]}</div>
    : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><i className="bi bi-car-front-fill me-2" style={{ color: '#4361ee' }}></i>Vehicles</div>
          <div className="page-subtitle">{vehicles.length} vehicles registered</div>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg"></i> Add Vehicle
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>#</th><th>Vehicle Number</th><th>Type</th><th>Owner</th><th>Contact</th><th>Entry Time</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr><td colSpan="7"><div className="table-empty"><i className="bi bi-car-front"></i><p>No vehicles found.</p></div></td></tr>
            ) : vehicles.map((v, i) => (
              <tr key={v.id}>
                <td style={{ color: '#cbd5e1', fontWeight: 600 }}>{i + 1}</td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{v.vehicleNumber}</td>
                <td>
                  <span className={`pill ${v.vehicleType === 'Car' ? 'pill-blue' : 'pill-green'}`}>
                    <i className={`bi ${v.vehicleType === 'Car' ? 'bi-car-front' : 'bi-bicycle'}`}></i> {v.vehicleType}
                  </span>
                </td>
                <td>{v.ownerName}</td>
                <td>{v.contactNumber}</td>
                <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{v.entryTime}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon-edit" onClick={() => openEdit(v)}><i className="bi bi-pencil-fill"></i></button>
                    <button className="btn-icon-del" onClick={() => handleDelete(v.id)}><i className="bi bi-trash-fill"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add New Vehicle' : 'Edit Vehicle'} onClose={closeModal} onSubmit={handleSubmit}
          submitLabel={modal === 'add' ? 'Add Vehicle' : 'Update Vehicle'}>
          <div className="form-row">
            <label className="form-label">Vehicle Number *</label>
            <input className={`form-input${errors.vehicleNumber ? ' error' : ''}`} name="vehicleNumber"
              value={form.vehicleNumber} onChange={handleChange} placeholder="e.g. WP CAA-1234" />
            <F name="vehicleNumber" />
          </div>
          <div className="form-row">
            <label className="form-label">Vehicle Type *</label>
            <select className="form-select-input" name="vehicleType" value={form.vehicleType} onChange={handleChange}>
              <option>Car</option>
              <option>Bike</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Owner Name *</label>
            <input className={`form-input${errors.ownerName ? ' error' : ''}`} name="ownerName"
              value={form.ownerName} onChange={handleChange} placeholder="Full name" />
            <F name="ownerName" />
          </div>
          <div className="form-row">
            <label className="form-label">Contact Number *</label>
            <input className={`form-input${errors.contactNumber ? ' error' : ''}`} name="contactNumber"
              value={form.contactNumber} onChange={handleChange} placeholder="e.g. 0771234567" />
            <F name="contactNumber" />
          </div>
          <div className="form-row">
            <label className="form-label">Entry Time *</label>
            <input type="datetime-local" className={`form-input${errors.entryTime ? ' error' : ''}`} name="entryTime"
              value={form.entryTime} onChange={handleChange} />
            <F name="entryTime" />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default VehicleList;
