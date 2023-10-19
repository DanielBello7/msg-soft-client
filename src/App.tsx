import { useApplicationData } from "./context/data.context";
import AuthenticationApp from "./apps/authentication.app";
import React from "react";
import MainApp from "./apps/main.app";
import ModalComponent from "./components/modal-component";
export default function App() {
    const { user } = useApplicationData();
    return (
        <React.Fragment>
            <div className="w-full h-full items-center justify-items-center md:p-10 md:px-20 lg:p-20 lg:px-60">
                <div className="w-full h-full bg-white rounded">
                    {
                        user
                            ? <MainApp />
                            : <AuthenticationApp />
                    }
                </div>
            </div>
            <ModalComponent />
        </React.Fragment>
    )
}
