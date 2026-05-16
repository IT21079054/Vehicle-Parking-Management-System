import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles, getSlots, getPayments, getCustomers } from '../api/api';

function Dashboard() {
  const [counts, setCounts] = useState({ vehicles: 0, slots: 0, payments: 0, customers: 0 });

  useEffect(() => {
    Promise.all([getVehicles(), getSlots(), getPayments(), getCustomers()])
      .then(([v, s, p, c]) =>
        setCounts({ vehicles: v.data.length, slots: s.data.length, payments: p.data.length, customers: c.data.length })
      ).catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Vehicles', count: counts.vehicles, icon: 'bi-car-front-fill', color: 'blue',   iconBg: '#eff2ff', iconColor: '#4361ee', link: '/vehicles' },
    { label: 'Parking Slots', count: counts.slots,    icon: 'bi-grid-3x3-gap-fill', color: 'green', iconBg: '#ecfdf5', iconColor: '#10b981', link: '/slots' },
    { label: 'Payments',      count: counts.payments,  icon: 'bi-cash-coin',         color: 'orange', iconBg: '#fffbeb', iconColor: '#f59e0b', link: '/payments' },
    { label: 'Customers',     count: counts.customers, icon: 'bi-people-fill',       color: 'purple', iconBg: '#faf5ff', iconColor: '#7209b7', link: '/customers' },
  ];

  const quickItems = [
    { label: 'Add Vehicle', sub: 'Register new vehicle', icon: 'bi-car-front-fill', iconBg: '#eff2ff', iconColor: '#4361ee', link: '/vehicles' },
    { label: 'Add Slot', sub: 'Create parking slot', icon: 'bi-grid-3x3-gap-fill', iconBg: '#ecfdf5', iconColor: '#10b981', link: '/slots' },
    { label: 'Add Payment', sub: 'Record a payment', icon: 'bi-cash-coin', iconBg: '#fffbeb', iconColor: '#f59e0b', link: '/payments' },
    { label: 'Add Customer', sub: 'Register customer', icon: 'bi-people-fill', iconBg: '#faf5ff', iconColor: '#7209b7', link: '/customers' },
  ];

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
          Good day, Admin! 👋
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>
          Here's what's happening in your parking system today.
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {stats.map((s) => (
          <Link to={s.link} className={`stat-card ${s.color}`} key={s.label}>
            <div className="stat-icon-wrap" style={{ background: s.iconBg, color: s.iconColor }}>
              <i className={`bi ${s.icon}`}></i>
            </div>
            <div className="stat-count">{s.count}</div>
            <div className="stat-title">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '1.4rem 1.5rem', border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
          Quick Actions
        </div>
        <div className="quick-grid">
          {quickItems.map((q) => (
            <Link to={q.link} className="quick-card" key={q.label}>
              <div className="quick-icon" style={{ background: q.iconBg, color: q.iconColor }}>
                <i className={`bi ${q.icon}`}></i>
              </div>
              <div>
                <div className="quick-title">{q.label}</div>
                <div className="quick-sub">{q.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
