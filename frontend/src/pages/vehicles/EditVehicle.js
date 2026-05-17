import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVehicle, updateVehicle } from '../../api/api';

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    vehicleNumber: '', vehicleType: 'Car', ownerName: '', contactNumber: '', entryTime: '',
  });

  useEffect(() => { getVehicle(id).then((res) => setForm(res.data)); }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVehicle(id, form).then(() => navigate('/vehicles'));
  };

  return (
    <div>
      <div className="page-header">
        <h4><i className="bi bi-pencil-fill me-2" style={{ color: '#4361ee' }}></i>Edit Vehicle</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/vehicles')}>
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
            <label className="form-label">Vehicle Type</label>
            <select className="form-select" name="vehicleType" value={form.vehicleType} onChange={handleChange}>
              <option>Car</option>
              <option>Bike</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Owner Name</label>
            <input className="form-control" name="ownerName" value={form.ownerName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input className="form-control" name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Entry Time</label>
            <input type="datetime-local" className="form-control" name="entryTime" value={form.entryTime} onChange={handleChange} required />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn-save">
              <i className="bi bi-check-lg me-1"></i>Update Vehicle
            </button>
            <button type="button" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}
              onClick={() => navigate('/vehicles')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVehicle;
