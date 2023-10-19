import { useApplicationData } from '@/context/data.context';
import { FaArrowCircleLeft, FaComments } from 'react-icons/fa';
import React from "react";
import TextBubbleTitle from './text-bubble-title';
import TextBubbleComponent from './text-bubble-component';
import TextInput from './text-input';

export default function ChatboxComponent() {
    const { activeConversation, activeScreen, setActiveScreen } = useApplicationData();
    return (
        <div className={`border-s h-full flex flex-col overflow-hidden ${activeScreen === "chat" ? "w-full" : "hidden"} sm:w-4/6 md:w-4/6 lg:w-4/6 sm:flex md:flex lg:flex`}>
            {
                !activeConversation &&
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='flex flex-col items-center'>
                        <FaComments size={150} />
                        <p className='font-bold text-gray-500 fs-8'>
                            Select or create a conversation
                        </p>

                        <button className='items-center mt-3 flex sm:hidden md:hidden lg:hidden' type='button' onClick={() => setActiveScreen("sidebar")}>
                            <FaArrowCircleLeft />
                            <p className='uppercase font-bold ms-1'>
                                sidebar
                            </p>
                        </button>
                    </div>
                </div>
            }
            {
                activeConversation &&
                <React.Fragment>
                    <TextBubbleTitle />
                    <TextBubbleComponent />
                    <TextInput />
                </React.Fragment>
            }
        </div>
    )
}
