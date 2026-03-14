import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './Routes/Index/Index.jsx';
import Welcome from './Routes/DialogGPT/Welcome/Welcome.jsx';
import Chat from './Routes/DialogGPT/Chat/Chat.jsx';

// Your new Consolidated Auth Imports
import Login from "./Routes/DialogGPT/Auth/Login.jsx";
import Register from "./Routes/DialogGPT/Auth/Register.jsx";
import ForgotPassword from "./Routes/DialogGPT/Auth/ForgotPassword.jsx";
import ResetPassword from "./Routes/DialogGPT/Auth/ResetPassword.jsx";

import './App.css';

function App() {
    return (
    <div className="app-root">
      <BrowserRouter>
        <Routes><Route path="/" element={<Index/>} />

          {/* Auth Routes */}
          <Route path="/DialogGPT/login" element={<Login/>} />
          <Route path="/DialogGPT/register" element={<Register/>} />
          <Route path="/DialogGPT/forgot-password" element={<ForgotPassword/>} />
          <Route path="/DialogGPT/reset-password/:token" element={<ResetPassword/>} />

          {/* Main App Routes */}
          <Route path="/DialogGPT" element={<Welcome/>} />
          <Route path="/DialogGPT/chat" element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
