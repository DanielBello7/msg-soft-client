import { useApplicationData } from "@/context/data.context";
import { FaEdit } from "react-icons/fa";
import Conversation from './conversation';

export default function ConversationsBar() {
    const { conversations } = useApplicationData();
    return (
        <div className="w-full flex flex-col grow overflow-hidden">
            <h4 className="p-2 font-bold text-xl">Conversations</h4>
            <div className="h-full overflow-scroll border-y border-blue-300">
                {
                    conversations.map((item, idx) => (
                        <Conversation
                            data={item}
                            id={idx}
                            key={idx}
                        />
                    ))
                }
                {
                    conversations.length < 1 &&
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex items-center">
                            <p className="text-gray-400 font-bold fs-8 me-2">
                                Your conversations appear here
                            </p>
                            <FaEdit size={20} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
