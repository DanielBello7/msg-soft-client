import SocketContextProvider from './context/socket.context.tsx';
import DataContextProvider from './context/data.context.tsx';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ModalContextProvider from './context/modal.context.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <DataContextProvider>
        <SocketContextProvider>
            <ModalContextProvider>
                <App />
            </ModalContextProvider>
        </SocketContextProvider>
    </DataContextProvider>
)
