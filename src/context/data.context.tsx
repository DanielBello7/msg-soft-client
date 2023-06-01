import { ConversationsDataType, ParticipantDataType } from "../vite-env";
import { temp } from "../constants";
import variables from "../constants/variables";
import React from "react";

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

    setSelected: React.Dispatch<React.SetStateAction<number | null>>

    API: string
    BASE_URL: string
    SOCKET: string
}

const DataContext = React.createContext({} as DataContextType);

const { API, BASE_URL, SOCKET } = variables.LOCAL;

export const useApplicationData = () => React.useContext(DataContext);

export default function DataContextProvider(props: DataContextProviderProps) {
    const [user, setUser] = React.useState<ParticipantDataType | null>(null);
    const [conversations, setConversations] = React.useState<ConversationsDataType[]>([...temp.conversations]);
    const [contacts, setContacts] = React.useState<ParticipantDataType[]>([...temp.users]);
    const [selected, setSelected] = React.useState<number | null>(null);

    return (
        <DataContext.Provider value={{
            contacts,
            setContacts,

            conversations,
            setConversations,

            setUser,
            user,

            activeConversation: selected !== null ? conversations[selected] : null,

            setSelected,

            API,
            BASE_URL,
            SOCKET
        }}>
            {props.children}
        </DataContext.Provider>
    )
}