export interface MessageData {
    text: string
    element?: HTMLDivElement
}
export interface Messages {
    [key: string]: MessageData
}
