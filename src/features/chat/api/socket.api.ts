import {io, Socket} from "socket.io-client";

export const socket = io("http://localhost:3009");


export const api = {
    socket: null as null | Socket,
    creatConnection() {
        this.socket = io("http://localhost:3009")
    },
    subscribe(initMessageHandler: (messages: any, fn:()=>void) => void,
              newMessageSendHandler: (message: any) => void,
              userTypingHandler: (user: any) => void
    ) {
        this.socket?.on('init-messages-published', initMessageHandler)
        this.socket?.on('new-message-send', newMessageSendHandler)
        this.socket?.on('user-is-typing', userTypingHandler)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
    sendName(name: string) {
        this.socket?.emit('client-name-send', name)
    },
    sendMessage(message: string) {
        this.socket?.emit('client-message-send', message, (error:any)=>{
            if (error) alert(error)
        })
    },
    typeMessage() {
        this.socket?.emit('client-typed')
    }
}