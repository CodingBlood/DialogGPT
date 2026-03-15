import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';
import ChatMessage from "./ChatMessage.jsx";

export default function ChatWindow() {
    const scrollRef = useRef(null);

    // This ensures that when the component loads (or messages are added),
    // it scrolls past the floating input bar.
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className="chat-wrapper">
            {/* 1. Scrollable Chat History */}
            <div className="chat-history">
                <ChatMessage sender="bot" text="Hi there! How can Dialog GPT assist you today?" />
                <ChatMessage sender="user" text="Tell me about my recent projects." />
                <ChatMessage sender="bot" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" />
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

                {/* 2. The Anchor: Ensures content clears the fixed input bar */}
                <div ref={scrollRef} className="scroll-anchor" />
            </div>

            {/* 3. Fixed Bottom Input Bar */}
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