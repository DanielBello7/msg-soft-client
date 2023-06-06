import { FaEllipsisH, FaInfoCircle, FaSun, FaTrashAlt } from "react-icons/fa";
import { useApplicationData } from "../context/data.context";
import { Menu, Transition } from "@headlessui/react";
import { useModalData } from "../context/modal.context";
import { useSocketData } from "../context/socket.context";
import React from "react";
import ConnectionStatus from "../modules/ConnectionStatus";

interface MenuItemProps {
    icon: React.ReactNode
    title: string
    onClick: Function
}

function MenuItem(props: MenuItemProps) {
    return (
        <Menu.Item>
            {
                ({ active, disabled }) => (
                    <button
                        className={`main-app ${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => props.onClick()}
                        disabled={disabled}
                    >
                        {props.icon}
                        <span className='ml-2 font-bold main-app'>{props.title}</span>
                    </button>
                )
            }
        </Menu.Item>
    )
}

function OptionsComponent() {
    const { setUser, setSelected, setConversations, setContacts, currentTab, setCurrentTab } = useApplicationData();
    const { socket, setSocket } = useSocketData();
    const { ToggleNewContact } = useModalData();

    const HandleLogout = () => {
        setUser(null);
        setConversations([]);
        setSelected(null);
        socket?.disconnect();
        setSocket(null);
        return setContacts([]);
    }

    const ButtonData = [
        {
            icon: <FaSun size={15} />,
            id: 1,
            title: currentTab === "conversations" ? "Show Contacts" : "Show Conversations",
            click: () => setCurrentTab(currentTab === "conversations" ? "contacts" : "conversations")
        },
        {
            icon: <FaInfoCircle size={15} />,
            click: () => ToggleNewContact(true),
            id: 3,
            title: "Add New Contact",
        },
        {
            id: 4,
            title: "Logout Session",
            icon: <FaTrashAlt size={15} />,
            click: () => HandleLogout()
        },
    ]

    const button_output = ButtonData.map((item, idx) => {
        return (
            <MenuItem
                icon={item.icon}
                onClick={item.click}
                title={item.title}
                key={idx}
            />
        )
    });

    return (
        <div className="text-right z-30">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="focus:outline-none">
                    <FaEllipsisH
                        strokeWidth={40}
                        size={20}
                        fill="black"
                    />
                </Menu.Button>

                <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            {button_output}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default function TitleBarComponent() {
    const { user } = useApplicationData();
    return (
        <div className="w-full border-b p-2 flex justify-between items-center">
            <div>
                <h4 className="font-bold text-2xl capitalize">{user?.fullname}</h4>
                <p className="text-xs text-gray-400">{user?._id}</p>
                <ConnectionStatus />
            </div>
            <OptionsComponent />
        </div>
    )
}