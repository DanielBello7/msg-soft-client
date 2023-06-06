import ConversationsBarComponent from "./ConversationsBarComponent";
import ContactsBarComponent from "./ContactsBarComponent";
import TitleBarComponent from "./TitleBarComponent";
import { useApplicationData } from "../context/data.context";

export default function SidebarComponent() {
    const { currentTab } = useApplicationData();

    return (
        <div className="h-full flex flex-col overflow-hidden w-2/6">
            <TitleBarComponent />
            {
                currentTab === "conversations" &&
                <ConversationsBarComponent />
            }
            {
                currentTab === "contacts" &&
                <ContactsBarComponent />
            }
        </div>
    )
}