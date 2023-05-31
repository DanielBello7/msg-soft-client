import { ConversationsDataType, ParticipantDataType } from '../vite-env';

const users: ParticipantDataType[] = [
    {
        _id: 'A',
        fullname: 'goke bello'
    },
    {
        _id: 'B',
        fullname: 'daniel bello'
    },
    {
        _id: 'C',
        fullname: 'david bello'
    }
]

const conversations: ConversationsDataType[] = [
    {
        _id: '1',
        createdAt: new Date().toDateString(),
        messages: [
            {
                _id: 'A1',
                createdAt: new Date().toDateString(),
                createdBy: users[0],
                conversation_id: '1',
                text: 'hello'
            },
            {
                _id: 'A2',
                createdAt: new Date().toDateString(),
                createdBy: users[1],
                conversation_id: '1',
                text: 'hi'
            },
            {
                _id: 'A3',
                createdAt: new Date().toDateString(),
                createdBy: users[0],
                conversation_id: '1',
                text: 'how are you?'
            },
        ],
        participants: [
            users[0],
            users[1]
        ]
    },
    {
        _id: '2',
        createdAt: new Date().toDateString(),
        messages: [
            {
                _id: 'B1',
                createdAt: new Date().toDateString(),
                createdBy: users[1],
                conversation_id: '2',
                text: `Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Hic nisi assumenda quod delectus 
                itaque soluta fuga id voluptas quisquam aspernatur 
                repudiandae consequuntur libero suscipit, 
                a officia accusamus facere! Excepturi, incidunt?`
            },
            {
                _id: 'B2',
                createdAt: new Date().toDateString(),
                createdBy: users[1],
                conversation_id: '2',
                text: `Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Hic nisi assumenda quod delectus 
                itaque soluta fuga id voluptas quisquam aspernatur`
            },
            {
                _id: 'B3',
                createdAt: new Date().toDateString(),
                createdBy: users[2],
                conversation_id: '2',
                text: `Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Hic nisi assumenda quod delect`
            },
        ],
        participants: [
            users[1],
            users[2]
        ]
    }
]

export { conversations, users }