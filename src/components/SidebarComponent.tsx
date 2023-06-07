import ConversationsBarComponent from "./ConversationsBarComponent";
import ContactsBarComponent from "./ContactsBarComponent";
import TitleBarComponent from "./TitleBarComponent";
import { useApplicationData } from "../context/data.context";

export default function SidebarComponent() {
    const { currentTab, activeScreen } = useApplicationData();

    return (
        <div className={`h-full flex flex-col overflow-hidden ${activeScreen === "sidebar" ? "w-full" : "hidden"} sm:w-2/6 md:w-2/6 lg:w-2/6 sm:flex md:flex lg:flex`}>
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