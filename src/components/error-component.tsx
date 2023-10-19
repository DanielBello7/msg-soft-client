import { FaSpinner, FaInfoCircle } from "react-icons/fa";
import { useSocketData } from "@/context/socket.context";

export default function ErrorComponent(props: { error: Error }) {
    const { socket, retrying } = useSocketData();
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex items-start">
                <FaInfoCircle
                    className="border-2 mt-1 border-red-300 rounded-full p-1"
                    size="50px"
                    color="red"
                />
                <div style={{ letterSpacing: '-1px' }} className="ms-2">
                    <h1 className="font-bold text-3xl">
                        Error occurred
                    </h1>

                    <p className=" fs-9 capitalize text-gray-400">
                        {props.error.message}
                    </p>
                    <button
                        className={`${retrying ? " bg-gray-400" : "bg-red-600"} border fs-7  text-white rounded mt-2 hover:bg-red-800 px-4 py-2 font-bold uppercase`}
                        type="button"
                        onClick={() => socket?.connect()}
                        disabled={retrying && true}
                    >
                        {
                            retrying
                                ? <FaSpinner className="animate-spin" size="18px" />
                                : "Retry"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
