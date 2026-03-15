import React, {useState} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // Added Link and useNavigate
import { FaGithub, FaGoogle } from 'react-icons/fa';
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          // 1. Convert your state object into URL-encoded form data
          const params = new URLSearchParams();
          params.append('username', formData.username);
          params.append('password', formData.password);

          // 2. Perform the request with the correct Content-Type header
          const response = await axios.post(
              'http://127.0.0.1:8000/DialogGPT/login',
              params, // Send params instead of the raw formData object
              {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              }
          );

          if (response.status === 200) {
              console.log("Login Success:", response.data);
              // Save the token!
              localStorage.setItem('token', response.data.access_token);
              navigate('/DialogGPT/chat');
          }
      } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
          alert("Login failed. Check username/password.");
      }
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
            <input type="text" placeholder="user_ID" value={formData.username} onChange={handleInputChange} name="username"  required />
          </div>

          <div className="input-group">
            <label>ACCESS KEY</label>
            <input type="password" placeholder="••••••••" value={formData.password}  onChange={handleInputChange} name="password" required />
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