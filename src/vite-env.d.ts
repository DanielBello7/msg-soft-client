/// <reference types="vite/client" />


export interface ParticipantDataType {
    fullname: string
    _id: string
}

export interface MessageDataType {
    createdBy: ParticipantDataType
    _id: string
    conversation_id: string
    createdAt: string
    text: string
    recipients: string[]
}

export interface ConversationsDataType {
    participants: ParticipantDataType[]
    _id: string
    messages: MessageDataType[]
    createdAt: string
    recipients: string[]
}