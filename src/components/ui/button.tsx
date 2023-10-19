import { FaSpinner } from "react-icons/fa";

type ButtonProps = {
    isLoading: boolean
    title: string
    click: Function
    type: "submit" | "button"
}
export default function Button({ click, isLoading, title, type }: ButtonProps) {
    return (
        <button className="mt-2 w-full h-10 text-white flex items-center justify-center bg-blue-500 hover:opacity-50 font-bold text-xs rounded"
            disabled={isLoading && true} onClick={() => click()} type={type}>
            {
                isLoading
                    ? <FaSpinner className="animate-spin" />
                    : title
            }
        </button>
    )
}
