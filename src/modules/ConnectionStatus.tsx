import { useSocketData } from "../context/socket.context";
import { FaSpinner } from "react-icons/fa";

function ConnectionStatus() {
    const { connected, retrying } = useSocketData();
    return (
        <div className={`font-bold uppercase fs-7 ${connected ? "text-green-800" : "text-red-800"}`}>
            {
                connected ? "connected"
                    :
                    retrying
                        ?
                        <div className="flex items-center">
                            <FaSpinner className="animate-spin me-1" />
                            <p>retrying to connect</p>
                        </div>
                        :
                        "disconnected"
            }
        </div>
    )
}

export default ConnectionStatus