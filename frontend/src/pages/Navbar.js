import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="navbar navbar-expand-lg main-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-p-square-fill me-2" style={{ color: '#4361ee' }}></i>
          ParkingMS
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto gap-1">
            {[
              { path: '/', label: 'Dashboard', icon: 'bi-speedometer2', exact: true },
              { path: '/vehicles', label: 'Vehicles', icon: 'bi-car-front-fill' },
              { path: '/slots', label: 'Slots', icon: 'bi-grid-3x3-gap-fill' },
              { path: '/payments', label: 'Payments', icon: 'bi-cash-coin' },
              { path: '/customers', label: 'Customers', icon: 'bi-people-fill' },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className="nav-link"
                  to={item.path}
                  style={
                    (item.exact ? location.pathname === item.path : isActive(item.path))
                      ? { color: '#fff', background: 'rgba(255,255,255,0.15)', borderRadius: '6px' }
                      : {}
                  }
                >
                  <i className={`bi ${item.icon} me-1`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              <i className="bi bi-person-circle me-1"></i>Admin
            </span>
            <button className="btn btn-sm" onClick={handleLogout}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}>
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
