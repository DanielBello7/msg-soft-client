import { useApplicationData } from "./context/data.context";
import AuthenticationApp from "./apps/authentication.app";
import React from "react";
import MainApp from "./apps/main.app";
import NewContactModal from "./modules/NewContact.modal";
import AlertModal from "./modules/Alert.modal";

function ModalComponent() {
  return (
    <React.Fragment>
      <NewContactModal />
      <AlertModal />
    </React.Fragment>
  )
}

export default function App() {
  const { user } = useApplicationData();
  return (
    <React.Fragment>
      <div className="w-full h-full items-center justify-items-center p-20">
        <div className="w-full h-full bg-white rounded">
          {user ? <MainApp /> : <AuthenticationApp />}
        </div>
      </div>
      <ModalComponent />
    </React.Fragment>
  )
}