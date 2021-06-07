import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import useLocalStorage from './contexts/useLocalStorage';
import LoginPage from './views/login';
import DashboardContextForUserIdProvider from './contexts/dashboardContext';
import ContactsProvider from './contexts/ContactsProvider';
import ConversationsProvider from './contexts/ConversationsProvider';
import SocketProvider from './contexts/SocketProvider';
import WindowResizeContextProvider from './contexts/WindowResizeContextProvider';
import DBContextProvider from './contexts/DBContextProvider';

export default function App() {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <DBContextProvider>
        <WindowResizeContextProvider>
          <ContactsProvider>
            <ConversationsProvider id={id}>
              <DashboardContextForUserIdProvider id={id}>
                <Dashboard />
              </DashboardContextForUserIdProvider>
            </ConversationsProvider>
          </ContactsProvider>
        </WindowResizeContextProvider>
      </DBContextProvider>
    </SocketProvider>
  );

  return <Router>{id ? dashboard : <LoginPage onIdSubmit={setId} />}</Router>;
}
