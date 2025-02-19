import { EVENT, send } from "./lib/engine";
import React from 'react';
import ErrorBoundary  from './component/error';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';


function App() {
    

    return(
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <React.Fragment>
                            test
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