import React from 'react';
import './Navitem.css';

export default function NavItem({ label, active }) {
    return (
        <div className={`nav-item ${active ? 'active' : ''}`}>
            <span className="nav-indicator">/</span>
            <span className="nav-label">{label}</span>
        </div>
    );
}