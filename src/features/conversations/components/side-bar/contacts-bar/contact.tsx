import { ConversationsDataType, ParticipantDataType } from '@/vite-env';
import { v4 as uuid } from 'uuid';
import { FaTrashAlt } from 'react-icons/fa';
import { useApplicationData } from '@/context/data.context';

export default function Contact(props: ParticipantDataType) {
    const {
        setContacts,
        contacts,
        conversations,
        setConversations,
        user,
        setSelected,
        setCurrentTab,
        setActiveScreen
    } = useApplicationData();

    const HandleClick = () => {
        const updated = contacts.filter((item) => item._id !== props._id);
        return setContacts(updated);
    }

    const HandleCreateNewConversation = (): void => {
        if (!user) return

        const contact_user = {
            fullname: props.fullname,
            _id: props._id,
        }

        const check = conversations.find((item) => {
            if (item.recipients.length === 2) {
                if (item.recipients.includes(contact_user._id) && item.recipients.includes(user._id)) return item
            }
        });

        if (check) {
            setSelected(check._id);
            return setCurrentTab("conversations");
        }

        const new_convo: ConversationsDataType = {
            _id: uuid(),
            createdAt: new Date().toDateString(),
            messages: [],
            participants: [contact_user, user],
            recipients: [contact_user._id, user._id]
        }

        setConversations([...conversations, new_convo]);
        setSelected(new_convo._id);
        setCurrentTab("conversations");
        return setActiveScreen("chat");
    }

    return (
        <div className="w-full p-2 border-b border-blue-200 flex hover:bg-blue-100 cursor-pointer">
            <div className="w-full" onClick={HandleCreateNewConversation}>
                <h3 className="font-bold capitalize">{props.fullname}</h3>
                <p className="fs-7 text-gray-500">{props._id}</p>
            </div>

            <div className="flex justify-center">
                <button className="hover:text-red-400" type="button" onClick={HandleClick}>
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    )
}
