import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSlot, updateSlot } from '../../api/api';

function EditSlot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ slotNumber: '', slotStatus: 'Available' });

  useEffect(() => { getSlot(id).then((res) => setForm(res.data)); }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSlot(id, form).then(() => navigate('/slots'));
  };

  return (
    <div>
      <div className="page-header">
        <h4><i className="bi bi-pencil-fill me-2" style={{ color: '#2ec4b6' }}></i>Edit Parking Slot</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/slots')}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Slot Number</label>
            <input className="form-control" name="slotNumber" value={form.slotNumber} onChange={handleChange} required />
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
              <i className="bi bi-check-lg me-1"></i>Update Slot
            </button>
            <button type="button" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}
              onClick={() => navigate('/slots')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSlot;
