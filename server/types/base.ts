export type ErrorRequest = {
    type: 'promise' | 'global' | 'react'
    name?: string
    message?: string
    position?: string
    source?: string
    stack?: string
    reason?: PromiseRejectionEvent
    time: string
}


//----------------------------------------[🔌 SOCKET]
export enum SocketEvents {
    // Клиент -> Сервер
    GET_ONLINE_USERS = 'getOnlineUsers',
    USER_SUB = 'user:subscribe',            // подписка на все события юзера(-ов) *комната
  
    // Сервер -> Клиент
    USER_LIST_UPDATE = 'onlineUsersUpdate',
}

// Клиент -> Сервер
export interface ServerPayloads {
    'getOnlineUsers': any
    'user:subscribe': string | string[]
}
// Сервер -> Клиент
export interface ClientPayloads {
    'onlineUsersUpdate': string[]
}