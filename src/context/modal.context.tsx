import React from "react";

interface ModalContextType {
    ToggleNewContact: (action: boolean) => void

    newContact: boolean

    alert: {
        show: boolean;
        msg: string;
    }

    ToggleAlert: (action: boolean, msg?: string) => void
}

interface ModalContextProviderProps {
    children: React.ReactNode
}

const ModalContext = React.createContext({} as ModalContextType);

export const useModalData = () => React.useContext(ModalContext);

export default function ModalContextProvider(props: ModalContextProviderProps) {
    const [newContact, setNewContact] = React.useState(false);
    const [alert, setAlert] = React.useState({ show: false, msg: "" });

    const ToggleNewContact = (action: boolean) => setNewContact(action);

    const ToggleAlert = (action: boolean, msg?: string) => {
        return setAlert({ show: action, msg: msg ? msg : alert.msg });
    }

    return (
        <ModalContext.Provider value={{
            ToggleNewContact,

            alert,
            ToggleAlert,

            newContact
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}