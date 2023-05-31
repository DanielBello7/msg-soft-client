import SidebarComponent from "../components/SidebarComponent";
import ChatboxComponent from "../components/ChatboxComponent";

function MainApp() {
    return (
        <div className="w-full h-full bg-white rounded flex flex-row">
            <SidebarComponent />
            <ChatboxComponent />
        </div>
    )
}

export default MainApp;