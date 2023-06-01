import { useApplicationData } from "../context/data.context";
import { io } from "socket.io-client";
import { useSocketData } from "../context/socket.context";
import React from "react";

export default function useCachedResources() {
    const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const { SOCKET, user } = useApplicationData();
    const { setSocket, setConnected, setRetrying } = useSocketData();

    React.useEffect(() => {
        function loadAsyncData() {

            const auth = {
                fullname: user?.fullname,
                _id: user?._id,
            }

            const main_socket = io(SOCKET, { autoConnect: false, auth: auth, reconnectionAttempts: 3 })
            setSocket(main_socket);

            main_socket.io.on('reconnect_failed', () => {
                // this is for when it has tried to connect multiple times and failed
                setRetrying(false);
                setError(new Error('could not connect to source'));
                setIsError(true);
                return setIsLoadingComplete(true);
            });

            main_socket.on('connect', () => {
                // this is for when it has connected
                setConnected(true);
                setError(null);
                setRetrying(false);
                setIsError(false);
                return setIsLoadingComplete(true);
            });

            main_socket.on('disconnect', () => {
                // this is for when there is a disconnect from the service
                setConnected(false);
                setRetrying(false);
                return setIsLoadingComplete(true);
            });

            main_socket.io.on('reconnect_attempt', () => {
                // this is for when it is trying to connect but it isnt working
                setConnected(false);
                return setRetrying(true);
            })

            return main_socket.connect();
        }

        loadAsyncData();
    }, []);

    return { isLoadingComplete, isError, error }
}