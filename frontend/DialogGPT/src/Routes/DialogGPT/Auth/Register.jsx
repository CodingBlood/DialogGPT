import React from 'react';
import './AuthPages.css';

export default function Register() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="tech-tag">USER_ENROLLMENT_V3</div>
                <h2 className="auth-title">Register</h2>

                <form className="auth-form">
                    <div className="input-group">
                        <label>USERNAME</label>
                        <input type="text" placeholder="Assign ID..." required />
                    </div>
                    <div className="input-group">
                        <label>EMAIL_ADDRESS</label>
                        <input type="email" placeholder="contact@domain.com" required />
                    </div>
                    <div className="input-group">
                        <label>ACCESS_KEY</label>
                        <input type="password" placeholder="Define secure key..." required />
                    </div>
                    <button type="submit" className="auth-btn">AUTHORIZE_CREATION</button>
                </form>

                <div className="auth-footer">
                    <span>ALREADY_MEMEBER? </span>
                    <a href="/DialogGPT/login">RETURN_TO_LOGIN</a>
                </div>
            </div>
        </div>
    );
}