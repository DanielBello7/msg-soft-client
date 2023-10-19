// SOCKET SERVER
const LIVE_SOCKET_API = process.env.VITE_LIVE_SOCKET_API as string ?? "";
const LOCAL_SOCKET_API = process.env.VITE_LOCAL_SOCKET_API as string ?? "";

// MAIN API SERVER
const LIVE_API = process.env.VITE_LIVE_API as string ?? "";
const LOCAL_API = process.env.VITE_LOCAL_API as string ?? "";

// CLIENT SERVER
const LOCAL_BASE_URL = process.env.VITE_LOCAL_BASE_URL as string ?? "";
const LIVE_BASE_URL = process.env.VITE_LIVE_BASE_URL as string ?? "";

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
