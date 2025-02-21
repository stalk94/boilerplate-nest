import { Socket } from "socket.io-client";

declare global {
    var gurl: 'http://localhost:3000/' | string;
    var languages: ['GB', 'RU', 'CN', 'DE'];
    var lang: 'GB' | 'RU' | 'CN' | 'DE';
    var token: string | undefined;
    var socket: Socket;
}

type ErrorRequest = {
    type: 'promise' | 'global' | 'react'
    name?: string
    message?: string
    position?: string
    source?: string
    stack?: string
    reason?: PromiseRejectionEvent.reason
    time: string
}
interface UserData {
    id: number
    login: string
    password: string
    role: 'user'|'admin'
}
type AllModels = {
    users: UserData[]
}


export type APIEndpoints = {
    'auth/login': { method: 'POST'; request: { login: string; password: string }; response: { token: string } };
    'auth/reg': { method: 'POST'; request: { login: string; password: string }; response: { token: string } };
    'allModels': { method: 'GET'; request: any; response: AllModels };
    'error': { method: 'POST'; request: ErrorRequest; response: any };
}