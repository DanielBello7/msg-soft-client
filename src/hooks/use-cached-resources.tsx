import { useApplicationData } from "../context/data.context";
import { useSocketData } from "../context/socket.context";
import { io } from "socket.io-client";
import { MessageDataType } from "../vite-env";
import React from "react";

export default function useCachedResources() {
    const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const { SOCKET, user, AddMessageToConversations, conversations, setConversations } = useApplicationData();
    const { setSocket, setConnected, setRetrying } = useSocketData();

    const HandleRecieveData = React.useCallback((msg: MessageDataType) => {
        if (!user) return
        const result = AddMessageToConversations(msg, conversations);
        return setConversations(result);
    }, [user, AddMessageToConversations, setConversations, conversations]);

    React.useEffect(() => {
        function loadAsyncData() {
            const auth = {
                fullname: user?.fullname,
                _id: user?._id,
            }

            const main_socket = io(SOCKET, {
                autoConnect: false,
                auth: auth,
                reconnectionAttempts: 3
            });

            setSocket(main_socket);

            main_socket.io.on('reconnect_failed', () => {
                // this is for when it has tried to connect multiple times and failed
                setRetrying(false);
                setError(new Error('could not connect to source'));
                setIsError(true);
                setIsLoadingComplete(true);
            });

            main_socket.on('connect', () => {
                // this is for when it has connected
                setConnected(true);
                setError(null);
                setRetrying(false);
                setIsError(false);
                setIsLoadingComplete(true);
            });

            main_socket.on('disconnect', () => {
                // this is for when there is a disconnect from the service
                setConnected(false);
                setRetrying(false);
                setIsLoadingComplete(true);
            });

            main_socket.io.on('reconnect_attempt', () => {
                // this is for when it is trying to connect but it isnt working
                setConnected(false);
                setRetrying(true);
            });

            main_socket.on('incoming', HandleRecieveData);
            main_socket.connect();
            return () => {
                main_socket.disconnect();
            }
        }

        loadAsyncData();
    }, [conversations]);

    return { isLoadingComplete, isError, error }
}
