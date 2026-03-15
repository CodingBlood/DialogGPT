import React from 'react';
import './ChatMessage.css';

export default function ChatMessage({ text, sender }) {
    const isBot = sender === 'bot';

    const BotIcon = (
        <svg className="avatar-svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const UserIcon = (
        <svg className="avatar-svg" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    return (
        <div className={`message-container ${isBot ? 'bot' : 'user'}`}>
            <div className="avatar-wrapper">
                {isBot ? BotIcon : UserIcon}
            </div>
            <div className="message-content">
                <div className="message-header">
                    <span className="tech-tag">{isBot ? "SYSTEM_CORE" : "USER_AUTH"}</span>
                </div>
                <div className="message-bubble">
                    {text}
                </div>
            </div>
        </div>
    );
}