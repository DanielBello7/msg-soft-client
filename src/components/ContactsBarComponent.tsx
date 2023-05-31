import { ConversationsDataType, ParticipantDataType } from "../vite-env";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useApplicationData } from "../context/data.context";
import { v4 as uuid } from 'uuid';

function Contact(props: ParticipantDataType) {
    const { setContacts, contacts, conversations, setConversations, user, setSelected } = useApplicationData();

    const HandleClick = () => {
        const updated = contacts.filter((item) => item._id !== props._id);
        return setContacts(updated);
    }

    const HandleNew = () => {
        if (!user) return

        const contact_user = {
            _id: props._id,
            fullname: props.fullname
        }

        const check = conversations.find((item) => {
            if (item.participants.length === 2) {
                const users = item.participants.map(u => u._id);
                if (users.includes(contact_user._id) && users.includes(user._id)) return item
            }
        });

        if (check) return setSelected(conversations.indexOf(check))

        const new_convo: ConversationsDataType = {
            _id: uuid(),
            createdAt: new Date().toDateString(),
            messages: [],
            participants: [contact_user, user]
        }

        setConversations((prev) => [...prev, new_convo]);
        return setSelected(conversations.length);
    }

    return (
        <div className="w-full p-2 border-b border-blue-200 flex hover:bg-blue-100 cursor-pointer">
            <div className="w-full" onClick={HandleNew}>
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

function ContactsBarComponent() {
    const { contacts } = useApplicationData();
    return (
        <div className="w-full flex grow flex-col">
            <h1 className="p-2 font-bold text-xl">Contacts</h1>
            <div className="border-t border-blue-300 flex flex-col grow overflow-scroll">
                {contacts.map((item) => <Contact {...item} key={item._id} />)}
                {
                    contacts.length < 1 &&
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex items-center">
                            <p className="text-gray-400 font-bold fs-8 me-2">
                                Your contacts appear here
                            </p>
                            <FaUsers size={20} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ContactsBarComponent