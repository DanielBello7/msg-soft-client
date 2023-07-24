const LIVE_SOCKET_API = 'http://192.168.200.35:3002';
const LOCAL_SOCKET_API = 'http://localhost:3002';
const LIVE_API = 'http://192.168.200.35:3002';
const LOCAL_API = 'http://localhost:3002';
const LOCAL_BASE_URL = 'http://localhost:3002';
const LIVE_BASE_URL = 'http://192.168.200.35:3002';

export default {
    LOCAL: {
        API: LOCAL_API,
        BASE_URL: LOCAL_BASE_URL,
        SOCKET: LOCAL_SOCKET_API
    },
    LIVE: {
        API: LIVE_API,
        BASE_URL: LIVE_BASE_URL,
        SOCKET: LIVE_SOCKET_API
    }
}