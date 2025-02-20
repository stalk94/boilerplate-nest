//import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';
import { EVENT, send } from "./lib/engine";
import React from 'react'
//import { Calendar, Home, Inbox, Search, Settings, ChevronDown } from "lucide-react";
import ErrorBoundary  from './components/error';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import AlarmPanelManager from "./components/alert";
import Test from "./components/utils/shop";
import './style/index.css';



function App() {
    const [taskAlert, setTaskAlert] = React.useState();

    const addTaskAlert =(type: "success" | "error" | "warn" | "info", text: string)=> {
        setTaskAlert({type: type, text: text});
    }

    React.useEffect(()=> {
        EVENT.on('success', (text)=> addTaskAlert('success', text));
        EVENT.on('error', (text)=> addTaskAlert('error', text));
        EVENT.on('warn', (text)=> addTaskAlert('warn', text));
        const token = localStorage.getItem('token');
    
        if(token) window.token = token;
        else if(import.meta.env.DEV) send('auth/login', { login: 'test', password: 'test' }, 'POST').then((res)=> {
            window.token = res.token;
            localStorage.setItem('token', res.token);
        }); 
    }, []);

    
    return(
        <ErrorBoundary>
            <AlarmPanelManager data={taskAlert} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <React.Fragment>
                            
                        </React.Fragment>
                    } />
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}



//------------------------------------------------------------------------
window.onload =()=> createRoot(document.querySelector(".root")).render(
    <App/>
);
window.addEventListener('beforeinstallprompt', (event)=> {
    console.log('beforeinstallprompt захвачено.');
    event.preventDefault();
    globalThis.deferredPrompt = event;
});


/**
 * <Sb 
                                open={true}
                                isCollapsed={isCollapsed}
                                schema={[{
                                    type: 'base',
                                    label: 'test',
                                    items: [{
                                        title: 'xro',
                                        icon: <Home />,
                                        comand: ()=> console.log('click')
                                    }]
                                }]}
                            />
 */