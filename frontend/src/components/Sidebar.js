import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'bi-speedometer2', exact: true },
  { path: '/vehicles', label: 'Vehicles', icon: 'bi-car-front-fill' },
  { path: '/slots', label: 'Parking Slots', icon: 'bi-grid-3x3-gap-fill' },
  { path: '/payments', label: 'Payments', icon: 'bi-cash-coin' },
  { path: '/customers', label: 'Customers', icon: 'bi-people-fill' },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/favicon.svg" alt="logo" style={{ width: 36, height: 36, borderRadius: 9 }} />
          <div>
            <h6 style={{ margin: 0 }}>ParkingMS</h6>
            <p style={{ margin: 0 }}>Management System</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-label">Menu</div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${isActive(item) ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon} nav-icon`}></i>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <p className="user-name">Admin</p>
            <p className="user-role">Administrator</p>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left"></i>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
