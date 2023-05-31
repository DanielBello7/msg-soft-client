import ConversationsBarComponent from "./ConversationsBarComponent";
import React from "react";
import TitleBarComponent from "./TitleBarComponent";
import ContactsBarComponent from "./ContactsBarComponent";

export type ACTIVE_SCREEN_TYPE = "conversations" | "contacts";

export default function SidebarComponent() {
    const [active, setActive] = React.useState<ACTIVE_SCREEN_TYPE>("conversations");

    return (
        <div className="h-full flex flex-col overflow-hidden w-2/6">
            <TitleBarComponent
                setActive={setActive}
                active={active}
            />
            {
                active === "conversations" &&
                <ConversationsBarComponent />
            }
            {
                active === "contacts" &&
                <ContactsBarComponent />
            }
        </div>
    )
}