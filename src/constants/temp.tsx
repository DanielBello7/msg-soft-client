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
                text: 'hello',
                recipients: [users[0]._id, users[1]._id]
            },
            {
                _id: 'A2',
                createdAt: new Date().toDateString(),
                createdBy: users[1],
                conversation_id: '1',
                text: 'hi',
                recipients: [users[0]._id, users[1]._id]
            },
            {
                _id: 'A3',
                createdAt: new Date().toDateString(),
                createdBy: users[0],
                conversation_id: '1',
                text: 'how are you?',
                recipients: [users[0]._id, users[1]._id]
            },
        ],
        participants: [
            users[0],
            users[1]
        ],
        recipients: [users[0]._id, users[1]._id]
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
                a officia accusamus facere! Excepturi, incidunt?`,
                recipients: [users[2]._id, users[1]._id]
            },
            {
                _id: 'B2',
                createdAt: new Date().toDateString(),
                createdBy: users[1],
                conversation_id: '2',
                text: `Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Hic nisi assumenda quod delectus 
                itaque soluta fuga id voluptas quisquam aspernatur`,
                recipients: [users[2]._id, users[1]._id]
            },
            {
                _id: 'B3',
                createdAt: new Date().toDateString(),
                createdBy: users[2],
                conversation_id: '2',
                text: `Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Hic nisi assumenda quod delect`,
                recipients: [users[2]._id, users[1]._id]
            },
        ],
        participants: [
            users[1],
            users[2]
        ],
        recipients: [users[2]._id, users[1]._id]
    }
]

export { conversations, users }