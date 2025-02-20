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
