import React from 'react';
import { useParams } from 'react-router-dom';
import './AuthPages.css';

export default function ResetPassword() {
    const { token } = useParams();

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="tech-tag">SECURITY_OVERRIDE_ACTIVE</div>
                <h2 className="auth-title">New Key</h2>

                <div className="input-group" style={{ opacity: 0.5 }}>
                    <label>ACTIVE_TOKEN</label>
                    <input type="text" value={token} disabled style={{ cursor: 'not-allowed' }} />
                </div>

                <form className="auth-form">
                    <div className="input-group">
                        <label>NEW_ACCESS_KEY</label>
                        <input type="password" placeholder="New key..." required />
                    </div>
                    <div className="input-group">
                        <label>CONFIRM_KEY</label>
                        <input type="password" placeholder="Repeat key..." required />
                    </div>
                    <button type="submit" className="auth-btn">UPDATE_CREDENTIALS</button>
                </form>
            </div>
        </div>
    );
}