import * as React from 'react';
import { useApplicationData } from '@/context/data.context';
import TextBubble from './text-bubble';

export default function TextBubbleComponent() {
    const { activeConversation } = useApplicationData();

    React.useEffect(() => {
        const element = document.getElementById("text-window");
        element?.scrollTo({ top: element.scrollHeight, behavior: 'auto' })
    }, [activeConversation?.messages.length]);

    if (!activeConversation) return null
    return (
        <div className="w-full border-b flex flex-col p-2 grow overflow-scroll bg-gray-100" id="text-window">
            {activeConversation.messages.map((item, idx) => {
                return (
                    <TextBubble
                        key={idx}
                        {...item}
                    />
                )
            })}
        </div>
    )
}
