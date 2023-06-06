import { ConversationsDataType, MessageDataType, ParticipantDataType } from "../vite-env";
import variables from "../constants/variables";
import React from "react";
import useCookie from "../hooks/useCookies";

export type ACTIVE_SCREEN_TYPE = "conversations" | "contacts";

interface DataContextProviderProps {
    children: React.ReactNode
}

interface DataContextType {
    setUser: React.Dispatch<React.SetStateAction<ParticipantDataType | null>>
    user: ParticipantDataType | null

    conversations: ConversationsDataType[]
    setConversations: React.Dispatch<React.SetStateAction<ConversationsDataType[]>>

    contacts: ParticipantDataType[]
    setContacts: React.Dispatch<React.SetStateAction<ParticipantDataType[]>>

    activeConversation: ConversationsDataType | null

    setSelected: React.Dispatch<React.SetStateAction<string | null>>

    API: string
    BASE_URL: string
    SOCKET: string

    AddMessageToConversations: (msg: MessageDataType, convo: ConversationsDataType[]) => ConversationsDataType[]

    currentTab: ACTIVE_SCREEN_TYPE
    setCurrentTab: React.Dispatch<React.SetStateAction<ACTIVE_SCREEN_TYPE>>
}

const DataContext = React.createContext({} as DataContextType);

const { API, BASE_URL, SOCKET } = variables.LOCAL;

export const useApplicationData = () => React.useContext(DataContext);

export default function DataContextProvider(props: DataContextProviderProps) {
    const [user, setUser] = useCookie<ParticipantDataType | null>("user", 2, null);
    const [conversations, setConversations] = useCookie<ConversationsDataType[]>("conversations", 2, []);
    const [contacts, setContacts] = useCookie<ParticipantDataType[]>("contacts", 2, []);
    const [selected, setSelected] = React.useState<string | null>(null);
    const [currentTab, setCurrentTab] = React.useState<ACTIVE_SCREEN_TYPE>("conversations");

    const GetCurrent = (): ConversationsDataType | null => {
        if (!selected) return null
        const selectedConversation = conversations.find((item) => item._id === selected);
        if (selectedConversation) return selectedConversation
        return null
    }

    const EqualityCheck = (a: string[], b: string[]): boolean => {
        if (a.length !== b.length) return false;
        return a.every((v, i) => v === b[i]);
    }

    const AddMessageToConversations = (msg: MessageDataType, convo: ConversationsDataType[]): ConversationsDataType[] => {
        const neededConversation = convo.filter((item) => {
            if (EqualityCheck(item.recipients, msg.recipients))
                return item
        });

        if (neededConversation.length > 0) {
            const updatedConversations = convo.map((item) => {
                if (EqualityCheck(item.recipients, msg.recipients))
                    item.messages = [...item.messages, msg]
                return item;
            });
            return updatedConversations
        }
        else {
            const newConversation: ConversationsDataType = {
                _id: msg.conversation_id,
                createdAt: msg.createdAt,
                messages: [msg],
                participants: [msg.createdBy, user!],
                recipients: msg.recipients
            }
            return [...convo, newConversation]
        }
    }

    return (
        <DataContext.Provider value={{
            contacts,
            setContacts,

            conversations,
            setConversations,

            setUser,
            user,

            activeConversation: GetCurrent(),

            setSelected,

            API,
            BASE_URL,
            SOCKET,

            AddMessageToConversations,

            currentTab,
            setCurrentTab
        }}>
            {props.children}
        </DataContext.Provider>
    )
}