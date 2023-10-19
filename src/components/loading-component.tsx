import { FaSpinner } from "react-icons/fa";
export default function LoadingComponent() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <FaSpinner className="animate-spin" />
        </div>
    )
}
