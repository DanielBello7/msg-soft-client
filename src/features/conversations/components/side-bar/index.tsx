import ConversationsBar from "./conversation-bar";
import ContactsBar from "./contacts-bar"
import TitleBar from "./components/title-bar";
import { useApplicationData } from "@/context/data.context";

export default function Sidebar() {
    const { currentTab, activeScreen } = useApplicationData();

    return (
        <div className={`h-full flex flex-col overflow-hidden ${activeScreen === "sidebar" ? "w-full" : "hidden"} sm:w-2/6 md:w-2/6 lg:w-2/6 sm:flex md:flex lg:flex`}>
            <TitleBar />
            {
                currentTab === "conversations" &&
                <ConversationsBar />
            }
            {
                currentTab === "contacts" &&
                <ContactsBar />
            }
        </div>
    )
}
