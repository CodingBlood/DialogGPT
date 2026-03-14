import Sidebar from "../../../Components/SideBar/Sidebar.jsx"; // Fixed spelling from Sidebas
import ChatWindow from "../../../Components/ChatWindow/ChatWindow.jsx";

export default function Chat() {
    return (
        <div className="app-layout" style={{ display: 'flex' }}>
            {/* Sidebar: Fixed at 25% width */}
            <Sidebar />
            <ChatWindow />
        </div>
    );
}