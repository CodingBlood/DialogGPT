import React, { useState } from 'react';
import NavItem from './../NavItem/Navitem.jsx';
import './Sidebar.css';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <nav className={`sidebar ${isOpen ? "active" : ""}`}>
                <div className="sidebar-content">
                    <div className="brand-container">
                        <svg className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h1 className="company-name">Dialog <span className="bold-gpt">GPT</span></h1>
                    </div>

                    <div className="nav-list">
                        <NavItem label="Dashboard" active />
                        <NavItem label="Projects" />
                        <NavItem label="Analytics" />
                        <NavItem label="Settings" />
                    </div>
                </div>

                <div className="sidebar-footer">
                    <span className="tech-tag">v3.0.4_STABLE</span>
                </div>
            </nav>
        </>
    );
}