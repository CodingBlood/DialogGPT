import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Routes/Welcome/Welcome.jsx'; // Your current landing page
import Chat from './Routes/Chat/Chat.jsx'; // Your new page
import './App.css'

function App() {
    return (
    <div className="app-root"> {/* No styles on this div! */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
