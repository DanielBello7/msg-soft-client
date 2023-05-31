import SocketContextProvider from './context/socket.context.tsx';
import DataContextProvider from './context/data.context.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ModalContextProvider from './context/modal.context.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataContextProvider>
      <SocketContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </SocketContextProvider>
    </DataContextProvider>
  </React.StrictMode>,
)