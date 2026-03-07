import React from 'react';
import './ChatWindow.css';
import ChatMessage from "./ChatMessage.jsx";

export default function ChatWindow() {
    return (
        <div className="chat-wrapper">
            {/* 1. Scrollable Chat History */}
            <div className="chat-history">
                <div className="chat-history">
                    <ChatMessage sender="bot" text="Hi there! How can Dialog GPT assist you today?" />
                    <ChatMessage sender="user" text="Tell me about my recent projects." />
                    <ChatMessage sender="bot" text="Hi there! How can Dialog GPT assist you today?" />
                    <ChatMessage sender="user" text="Tell me about my recent projects." />
                    <ChatMessage sender="bot" text="Hi there! How can Dialog GPT assist you today?" />
                    <ChatMessage sender="user" text="Tell me about my recent projects." />
                    <ChatMessage sender="bot" text="Hi there! How can Dialog GPT assist you today?" />
                    <ChatMessage sender="user" text="Tell me about my recent projects." />
                    <ChatMessage sender="bot" text="Hi there! How can Dialog GPT assist you today?" />
                    <ChatMessage sender="user" text="Tell me about my recent projects." />
                    <ChatMessage sender="bot" text="Hi there! How can Dialog GPT assist you today?" />
                    <ChatMessage sender="user" text="Tell me about my recent projects." />
                </div>
            </div>

            {/* 2. Fixed Bottom Input Bar */}
            <div className="chat-input-container">
                <div className="input-box">
                    <input type="text" placeholder="Type a message..." />
                    <button className="send-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}