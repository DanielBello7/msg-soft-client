import { useApplicationData } from "@/context/data.context";
import { MessageDataType } from "@/vite-env";
import * as React from 'react';

export default function TextBubble(props: MessageDataType) {
    const {
        user,
        activeConversation,
        conversations,
        setConversations
    } = useApplicationData();
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

