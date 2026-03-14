import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // Added Link and useNavigate
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // After logic, send them to the Welcome page
    navigate('/DialogGPT');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <div className="form-tag">// SECURE_ACCESS_v1.0</div>
          <h1 className="form-title">
            The <span>Dialog</span>GPT
          </h1>
          <p className="form-subtitle">ENTER_CREDENTIALS_TO_PROCEED</p>
        </header>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>USERNAME</label>
            <input type="text" placeholder="user_ID" required />
          </div>

          <div className="input-group">
            <label>ACCESS KEY</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <div className="form-options">
            {/* Link to Forgot Password */}
            <Link to="/DialogGPT/forgot-password" style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>
              RECOVER_ACCESS_KEY?
            </Link>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">SIGN IN</button>
            {/* Link to Register */}
            <Link to="/DialogGPT/register" className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
              CREATE ACCOUNT
            </Link>
          </div>
        </form>

        <div className="divider"><span>OR CONNECT VIA</span></div>

        <div className="social-login">
          <button className="social-btn">
            <FaGithub size={20} />
            <span>GITHUB</span>
          </button>
          <button className="social-btn">
            <FaGoogle size={20} />
            <span>GOOGLE</span>
          </button>
        </div>
      </div>
    </div>
  );
}