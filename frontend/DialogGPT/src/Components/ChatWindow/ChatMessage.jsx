import React from 'react';
import './ChatMessage.css';

export default function ChatMessage({ text, sender }) {
    const isBot = sender === 'bot';

    // Bot SVG Logo (Matches your Sidebar)
    const BotIcon = (
        <svg className="avatar-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 9H16M8 13H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // User SVG Icon
    const UserIcon = (
        <svg className="avatar-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    return (
    <div className={`message-container ${isBot ? 'bot' : 'user'}`}>
        {/* If it's a bot, show icon FIRST */}
        {isBot && (
            <div className="avatar-wrapper">{BotIcon}</div>
        )}

        <div className="message-bubble">
            {text}
        </div>

        {/* If it's a user, show icon LAST */}
        {!isBot && (
            <div className="avatar-wrapper">{UserIcon}</div>
        )}
    </div>
);
}