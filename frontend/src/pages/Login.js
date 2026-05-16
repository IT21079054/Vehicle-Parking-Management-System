import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = 'Username is required.';
    if (!password.trim()) e.password = 'Password is required.';
    else if (password.length < 4) e.password = 'Password must be at least 4 characters.';
    return e;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError('');
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setErrors({});
    setLoading(true);
    try {
      await login({ username, password });
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } catch {
      setApiError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.1rem' }}>
          <img src="/favicon.svg" alt="logo" style={{ width: 64, height: 64, borderRadius: 16 }} />
        </div>
        <div className="login-title">ParkingMS</div>
        <div className="login-sub">Vehicle Parking Management System</div>

        {apiError && (
          <div className="alert-error">
            <i className="bi bi-exclamation-circle-fill"></i> {apiError}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          <div className="field-group">
            <label className="field-label">Username</label>
            <div className="input-wrap">
              <i className="bi bi-person input-icon"></i>
              <input
                className={`field-input${errors.username ? ' error' : ''}`}
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: '' })); }}
              />
            </div>
            {errors.username && <div className="err-msg"><i className="bi bi-exclamation-circle"></i>{errors.username}</div>}
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="input-wrap">
              <i className="bi bi-lock input-icon"></i>
              <input
                className={`field-input${errors.password ? ' error' : ''}`}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              />
            </div>
            {errors.password && <div className="err-msg"><i className="bi bi-exclamation-circle"></i>{errors.password}</div>}
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading
              ? <><i className="bi bi-hourglass-split"></i> Logging in...</>
              : <><i className="bi bi-box-arrow-in-right"></i> Login</>}
          </button>
        </form>

        <div className="login-hint">
          <i className="bi bi-info-circle me-1"></i>
          Default: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}

export default Login;
