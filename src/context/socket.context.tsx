import { Socket } from "socket.io-client";
import React from "react";

interface SocketContextProviderProps {
    children: React.ReactNode
}

interface SocketContextType {
    socket: Socket | null
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>

    connected: boolean
    setConnected: React.Dispatch<React.SetStateAction<boolean>>

    retrying: boolean
    setRetrying: React.Dispatch<React.SetStateAction<boolean>>
}

const SocketContext = React.createContext({} as SocketContextType);

export const useSocketData = () => React.useContext(SocketContext);

export default function SocketContextProvider(props: SocketContextProviderProps) {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [connected, setConnected] = React.useState(false);
    const [retrying, setRetrying] = React.useState(false);

    return (
        <SocketContext.Provider value={{
            socket,
            setSocket,
            connected,
            setConnected,

            retrying,
            setRetrying
        }}>
            {props.children}
        </SocketContext.Provider>
    )
}