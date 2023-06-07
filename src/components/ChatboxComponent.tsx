import { useApplicationData } from '../context/data.context';
import { AiOutlineSend } from 'react-icons/ai'
import { MessageDataType } from '../vite-env';
import { v4 as uuid } from 'uuid';
import { useModalData } from '../context/modal.context';
import { FaArrowCircleLeft, FaComments, FaTrashAlt } from 'react-icons/fa';
import { useSocketData } from '../context/socket.context';
import React from "react";

function TextBubbleTitleComponent() {
    const { activeConversation, user, conversations, setConversations, setSelected, setActiveScreen } = useApplicationData();
    const data = activeConversation?.participants.filter((item) => item._id !== user?._id);

    const HandleDeleteConversation = () => {
        const filteredConversations = conversations.filter((item) => item._id !== activeConversation?._id);
        setSelected(null);
        return setConversations(filteredConversations);
    }

    const HandleCloseChatBox = () => {
        setActiveScreen("sidebar");
        setSelected(null);
    }

    return (
        <div className='border-b p-3 flex justify-between items-center' style={{ height: '65px' }}>
            <div className='flex items-center overflow-scroll me-2'>
                {
                    data?.map((item, idx) => {
                        return (
                            <div className='me-2' key={idx}>
                                <p className='capitalize font-bold text-xl'>{item.fullname}</p>
                                <p className='fs-7 text-gray-500'>{item._id}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex items-center'>
                <button type='button' className="me-5" onClick={HandleCloseChatBox} title='Back'>
                    <FaArrowCircleLeft size="25px" />
                </button>

                <button type='button' onClick={HandleDeleteConversation} title='Delete Conversation'>
                    <FaTrashAlt size="25px" />
                </button>
            </div>
        </div>
    )
}

function TextBubble(props: MessageDataType) {
    const { user, activeConversation, conversations, setConversations } = useApplicationData();
    const screenWindow = document.getElementById("text-window");
    const observer = React.useRef<IntersectionObserver | null>(null);

    const CheckIsSeen = React.useCallback((node: HTMLDivElement) => {
        observer.current = new IntersectionObserver((enteries) => {
            const currentlyActive = enteries[0];
            if (!currentlyActive.isIntersecting) return
            const message = activeConversation?.messages.find((item) => item._id === currentlyActive.target.id);
            if (!message) return
            if (message.createdBy._id === user?._id) return
            const result = conversations.map((item) => {
                if (item._id === activeConversation?._id) {
                    item.messages = item.messages.map((msg) => {
                        if (msg._id === message?._id) msg.isRead = true
                        return msg;
                    })
                }
                return item;
            });
            return setConversations(result);
        }, { root: screenWindow, rootMargin: '0px', threshold: 0.3 });
        if (node) observer.current.observe(node);
        return false;
    }, [screenWindow, activeConversation, props._id, setConversations]);

    if (props.createdBy._id === user?._id) {
        return (
            <div className='py-2 ps-10 flex flex-col pb-4' id={props._id}>
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
        <div className='py-2 pe-10 flex flex-col pb-4' ref={CheckIsSeen} id={props._id}>
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
        element?.scrollTo({ top: element.scrollHeight, behavior: 'auto' })
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
    const [value, setValue] = React.useState("");
    const { AddMessageToConversations, setConversations, conversations, user, activeConversation } = useApplicationData();
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

export default function ChatboxComponent() {
    const { activeConversation, activeScreen, setActiveScreen } = useApplicationData();
    return (
        <div className={`border-s h-full flex flex-col overflow-hidden ${activeScreen === "chat" ? "w-full" : "hidden"} sm:w-4/6 md:w-4/6 lg:w-4/6 sm:flex md:flex lg:flex`}>
            {
                !activeConversation &&
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='flex flex-col items-center'>
                        <FaComments size={150} />
                        <p className='font-bold text-gray-500 fs-8'>Select or create a conversation</p>

                        <button className='items-center mt-3 flex sm:hidden md:hidden lg:hidden' type='button' onClick={() => setActiveScreen("sidebar")}>
                            <FaArrowCircleLeft />
                            <p className='uppercase font-bold ms-1'>sidebar</p>
                        </button>
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