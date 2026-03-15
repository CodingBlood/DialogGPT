import React from 'react';
import './AuthPages.css';

export default function ForgotPassword() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="tech-tag">CREDENTIAL_RECOVERY</div>
                <h2 className="auth-title">Lost Key?</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '20px', fontFamily: 'Space Mono' }}>
                    ENTER_EMAIL_TO_RECEIVE_RECOVERY_TOKEN
                </p>

                <form className="auth-form">
                    <div className="input-group">
                        <label>REGISTERED_EMAIL</label>
                        <input type="email" placeholder="Enter link..." required />
                    </div>
                    <button type="submit" className="auth-btn">SEND_RECOVERY_LINK</button>
                </form>

                <div className="auth-footer">
                    <a href="/DialogGPT/login">ABORT_RECOVERY</a>
                </div>
            </div>
        </div>
    );
}