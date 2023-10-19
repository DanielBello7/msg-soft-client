import { useApplicationData } from "./context/data.context";
import React from "react";
import ModalComponent from "./components/modal-component";
import ConversationsPage from "./pages/conversations";
import LoginPage from "./pages/login";
export default function App() {
    const { user } = useApplicationData();
    return (
        <React.Fragment>
            <div className="w-full h-full items-center justify-items-center md:p-10 md:px-20 lg:p-20 lg:px-60">
                <div className="w-full h-full bg-white rounded">
                    {
                        user
                            ? <ConversationsPage />
                            : <LoginPage />
                    }
                </div>
            </div>
            <ModalComponent />
        </React.Fragment>
    )
}
