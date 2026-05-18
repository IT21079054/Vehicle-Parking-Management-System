import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VehicleList from './pages/vehicles/VehicleList';
import SlotList from './pages/slots/SlotList';
import PaymentList from './pages/payments/PaymentList';
import CustomerList from './pages/customers/CustomerList';

const pageTitles = {
  '/': { title: 'Dashboard', sub: 'Overview of your parking system' },
  '/vehicles': { title: 'Vehicles', sub: 'Manage all registered vehicles' },
  '/slots': { title: 'Parking Slots', sub: 'Manage parking slot availability' },
  '/payments': { title: 'Payments', sub: 'Track all payment records' },
  '/customers': { title: 'Customers', sub: 'Manage customer information' },
};

function Layout({ children }) {
  const location = useLocation();
  const info = pageTitles[location.pathname] || { title: 'ParkingMS', sub: '' };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <div className="top-bar">
          <div>
            <div className="top-bar-title">{info.title}</div>
            <div className="top-bar-sub">{info.sub}</div>
          </div>
        </div>
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/vehicles" element={<PrivateRoute><VehicleList /></PrivateRoute>} />
        <Route path="/slots" element={<PrivateRoute><SlotList /></PrivateRoute>} />
        <Route path="/payments" element={<PrivateRoute><PaymentList /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
