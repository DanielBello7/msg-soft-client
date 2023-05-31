import React from "react";

interface SocketContextProviderProps {
    children: React.ReactNode
}

interface SocketContextType {

}

const SocketContext = React.createContext({} as SocketContextType);

export const useSocketData = () => React.useContext(SocketContext);

export default function SocketContextProvider(props: SocketContextProviderProps) {
    return (
        <SocketContext.Provider value={{

        }}>
            {props.children}
        </SocketContext.Provider>
    )
}