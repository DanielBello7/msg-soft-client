import { Menu } from "@headlessui/react";
import * as React from 'react';
interface MenuItemProps {
    icon: React.ReactNode
    title: string
    onClick: Function
}
export default function MenuItem(props: MenuItemProps) {
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
