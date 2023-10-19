import * as React from 'react';
import { useApplicationData } from '@/context/data.context';
import { useSocketData } from '@/context/socket.context';
import { AiOutlineSend } from 'react-icons/ai';
import { useModalData } from '@/context/modal.context';
import { v4 as uuid } from 'uuid';
import { MessageDataType } from '@/vite-env';

export default function TextInput() {
    const [value, setValue] = React.useState("");
    const {
        AddMessageToConversations,
        setConversations,
        conversations,
        user,
        activeConversation
    } = useApplicationData();
    const { ToggleAlert: ToggleToast } = useModalData();
    const { socket } = useSocketData();

    const calcHeight = (value: string) => {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        return newHeight;
    }

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!value.trim()) return ToggleToast(true, "Please type in something...");
        if (!activeConversation || !user) return

        const data: MessageDataType = {
            _id: uuid(),
            conversation_id: activeConversation?._id,
            createdAt: new Date().toDateString(),
            createdBy: user,
            text: value,
            recipients: activeConversation?.recipients,
            isRead: true
        }

        setConversations(AddMessageToConversations(data, conversations));

        const id = activeConversation.recipients.filter((item) => item !== user._id);
        socket?.emit('outgoing', { ...data, isRead: false }, { id: id });
        return setValue("");
    }

    return (
        <form className="flex items-center" onSubmit={HandleSubmit}>
            <textarea
                className="bg-white w-full text-black p-2 border-0"
                required
                value={value}
                style={{
                    height: calcHeight(value),
                    resize: 'none',
                    minHeight: "40px",
                }}
                placeholder='Type something...'
                onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button className="bg-white text-black ms-1 p-3" type="submit">
                <AiOutlineSend />
            </button>
        </form>
    )
}
