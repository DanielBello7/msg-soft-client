import { useApplicationData } from "@/context/data.context";
import ConnectionStatus from "@/components/connection-status";
import Options from "./options";
export default function TitleBar() {
    const { user } = useApplicationData();
    return (
        <div className="w-full border-b p-2 flex justify-between items-center">
            <div>
                <h4 className="font-bold text-2xl capitalize">
                    {user?.fullname}
                </h4>
                <p className="text-xs text-gray-400">
                    {user?._id}
                </p>
                <ConnectionStatus />
            </div>
            <Options />
        </div>
    )
}
