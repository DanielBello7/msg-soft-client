import { ConversationsDataType } from "../vite-env";
import { useApplicationData } from "../context/data.context";
import { FaEdit } from "react-icons/fa";

interface ConversationProps {
    id: number
    data: ConversationsDataType
}

function Conversation(props: ConversationProps) {
    const { user, setSelected, activeConversation } = useApplicationData();
    const participants = props.data.participants.filter((item) => item._id !== user?._id);
    const lastMessage = props.data.messages[props.data.messages.length - 1];
    const people = participants.map((item) => (item.fullname)).join(", ");
    const HandleClick = () => setSelected(props.data._id);

    return (
        <div
            className={`w-full border-b border-blue-400 p-2 cursor-pointer hover:bg-blue-100 ${activeConversation?._id === props.data._id && "bg-blue-50"}`}
            key={props.id}
            onClick={HandleClick}
        >
            <div className="w-full capitalize font-bold">
                {people.slice(0, 50).trim()}{people.length > 50 && "..."}
            </div>

            <div className="w-full flex justify-between">
                <div className="w-3/4">
                    <p className="text-sm">
                        {lastMessage?.text.slice(0, 50).trim()}{lastMessage?.text.length > 50 && "..."}
                    </p>
                    <p className="fs-7 text-gray-500 capitalize">
                        {lastMessage?.createdBy.fullname}
                    </p>
                </div>
                <p className="w-1/4 text-end fs-8 text-gray-500">
                    {lastMessage?.createdAt}
                </p>
            </div>
        </div>
    )
}

function ConversationsBarComponent() {
    const { conversations } = useApplicationData();
    return (
        <div className="w-full flex flex-col grow overflow-hidden">
            <h4 className="p-2 font-bold text-xl">Conversations</h4>
            <div className="h-full overflow-scroll border-y border-blue-300">
                {conversations.map((item, idx) => (
                    <Conversation
                        data={item}
                        id={idx}
                        key={idx}
                    />
                ))}
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

export default ConversationsBarComponent;