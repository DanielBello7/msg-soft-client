import { FaTrashAlt, FaArrowCircleLeft } from "react-icons/fa";
import { useApplicationData } from "@/context/data.context";

export default function TextBubbleTitle() {
    const {
        activeConversation,
        user,
        conversations,
        setConversations,
        setSelected,
        setActiveScreen
    } = useApplicationData();
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
                                <p className='capitalize font-bold text-xl'>
                                    {item.fullname}
                                </p>
                                <p className='fs-7 text-gray-500'>
                                    {item._id}
                                </p>
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
