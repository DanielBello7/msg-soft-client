import { useApplicationData } from '../context/data.context';
import { AiOutlineSend } from 'react-icons/ai'
import { MessageDataType } from '../vite-env';
import { v4 as uuid } from 'uuid';
import { useModalData } from '../context/modal.context';
import { FaComments } from 'react-icons/fa';
import React from "react";

function TextBubbleTitleComponent() {
    const { activeConversation, user } = useApplicationData();
    const data = activeConversation?.participants.filter((item) => item._id !== user?._id);
    return (
        <div className='border-b font-bold text-2xl flex items-center overflow-scroll p-3 capitalize' style={{ height: '65px' }}>
            {data?.map((item) => item.fullname).join(", ")}
        </div>
    )
}

function TextBubble(props: MessageDataType) {
    const { user } = useApplicationData();
    if (props.createdBy._id === user?._id) {
        return (
            <div className='py-2 ps-10 flex flex-col pb-4'>
                <div className='self-end p-2 rounded bg-gray-300'>
                    <p>{props.text}</p>
                </div>
                <p className='capitalize text-black-400 text-sm mt-1 ms-1 self-end font-bold'>
                    {props.createdBy.fullname}
                </p>
                <p className='text-gray-400 text-xs mt-1 ms-1 self-end'>
                    {props.createdAt}
                </p>
            </div>
        )
    }
    else return (
        <div className='py-2 pe-10 flex flex-col pb-4'>
            <div className='self-start p-2 rounded bg-blue-50'>
                <p>{props.text}</p>
            </div>
            <p className='capitalize text-black-400 text-sm mt-1 ms-1 font-bold'>
                {props.createdBy.fullname}
            </p>
            <p className='text-gray-400 text-xs mt-1 ms-1'>
                {props.createdAt}
            </p>
        </div>
    )
}

function TextBubbleComponent() {
    const { activeConversation } = useApplicationData();

    React.useEffect(() => {
        const element = document.getElementById("text-window");
        element?.scrollTo({ top: element.offsetHeight, behavior: 'auto' })
    }, [activeConversation?.messages.length]);

    if (!activeConversation) return null
    return (
        <div className="w-full border-b flex flex-col p-2 grow overflow-scroll bg-gray-100" id="text-window">
            {activeConversation.messages.map((item, idx) => {
                return <TextBubble key={idx} {...item} />
            })}
        </div>
    )
}

function TextInputComponent() {
    const { conversations, setConversations, activeConversation, user } = useApplicationData();
    const { ToggleAlert: ToggleToast } = useModalData();
    const [value, setValue] = React.useState("");

    const calcHeight = (value: string) => {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        return newHeight;
    }

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!value.trim()) return ToggleToast(true, "Please type in something...");
        if (!activeConversation || !user) return

        const check = activeConversation.participants.filter(item => item._id === user._id);

        if (check.length < 1) {
            const correction = conversations.map((item) => {
                if (item._id === activeConversation._id) item.participants = [...item.participants, user]
                return item
            });
            setConversations(correction);
        }

        const data: MessageDataType = {
            _id: uuid(),
            conversation_id: activeConversation?._id,
            createdAt: new Date().toDateString(),
            createdBy: user,
            text: value
        }

        const updated = conversations.map((item) => {
            if (item._id === activeConversation._id) item.messages = [...item.messages, data]
            return item
        });

        setConversations(updated);
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

export default function ChatboxComponent() {
    const { activeConversation } = useApplicationData();
    return (
        <div className="border-s h-full flex flex-col overflow-hidden w-4/6">
            {
                !activeConversation &&
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='flex flex-col items-center'>
                        <FaComments size={150} />
                        <p className='font-bold text-gray-500 fs-8'>Select or create a conversation</p>
                    </div>
                </div>
            }
            {
                activeConversation &&
                <React.Fragment>
                    <TextBubbleTitleComponent />
                    <TextBubbleComponent />
                    <TextInputComponent />
                </React.Fragment>
            }
        </div>
    )
}