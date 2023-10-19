import { useApplicationData } from "@/context/data.context";
import { ConversationsDataType } from "@/vite-env";
import { FaDotCircle } from "react-icons/fa";
import React from "react";
interface ConversationProps {
    id: number
    data: ConversationsDataType
}
export default function Conversation(props: ConversationProps) {
    const { user, setSelected, activeConversation, setActiveScreen } = useApplicationData();
    const [hasUnreadMessages, setHasUnreadMessages] = React.useState(false);
    const participants = props.data.participants.filter((item) => item._id !== user?._id);
    const lastMessage = props.data.messages[props.data.messages.length - 1];
    const people = participants.map((item) => (item.fullname)).join(", ");

    const HandleClick = () => {
        setSelected(props.data._id)
        setActiveScreen("chat");
    };

    React.useEffect(() => {
        const confirm = props.data.messages.filter((item) => !item.isRead);
        if (confirm.length > 0) setHasUnreadMessages(true);
        else setHasUnreadMessages(false);
    }, [props.data.messages]);

    return (
        <div
            className={`w-full border-b border-blue-400 p-2 cursor-pointer hover:bg-blue-100 flex ${activeConversation?._id === props.data._id && "bg-blue-50"}`}
            key={props.id}
            onClick={HandleClick}
        >
            <div className="me-1 pt-2">
                {
                    hasUnreadMessages
                        ?
                        <FaDotCircle
                            className="text-blue-500"
                            size="8px"
                        />
                        :
                        <div className="text-white">.</div>
                }
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="w-2/3">
                    <div className="w-full capitalize font-bold">
                        {people.slice(0, 50).trim()}{people.length > 50 && "..."}
                    </div>
                    <p className="text-sm">
                        {lastMessage?.text.slice(0, 50).trim()}
                        {lastMessage?.text.length > 50 && "..."}
                    </p>
                </div>
                <p className="w-1/3 text-end fs-7 text-gray-500">
                    {lastMessage?.createdAt}
                </p>
            </div>
        </div>
    )
}
