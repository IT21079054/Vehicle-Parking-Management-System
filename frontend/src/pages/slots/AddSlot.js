import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSlot } from '../../api/api';

function AddSlot() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ slotNumber: '', slotStatus: 'Available' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createSlot(form).then(() => navigate('/slots'));
  };

  return (
    <div>
      <div className="page-header">
        <h4><i className="bi bi-plus-circle-fill me-2" style={{ color: '#2ec4b6' }}></i>Add Parking Slot</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/slots')}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Slot Number</label>
            <input className="form-control" name="slotNumber" value={form.slotNumber}
              onChange={handleChange} placeholder="e.g. A-01" required />
          </div>
          <div className="mb-4">
            <label className="form-label">Slot Status</label>
            <select className="form-select" name="slotStatus" value={form.slotStatus} onChange={handleChange}>
              <option>Available</option>
              <option>Occupied</option>
            </select>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn-save">
              <i className="bi bi-check-lg me-1"></i>Save Slot
            </button>
            <button type="button" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}
              onClick={() => navigate('/slots')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSlot;
