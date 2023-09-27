import s from './messages.module.css'
import {useEffect, useRef} from "react";

type MessagesType = {
    messages: {
        user: { name: string },
        message: string
    }[],
    name: string
}
export const Messages = ({messages, name}: MessagesType) => {
    useEffect(() => {
        messagesAncorRef.current?.scrollIntoView({behavior: "smooth"})// плавная прокрутка до последнего элемента через ref
    }, [messages])
    const messagesAncorRef = useRef<HTMLDivElement>(null)
    // console.log("messages", messages)
    return (
        <div className={s.messages}>
            {messages && messages.map((m, i) => {
                const itsMe = m.user.name?.trim().toLowerCase() === name.trim().toLowerCase()
                const className = itsMe ? s.me : s.user
                return (
                    <div key={i} className={`${s.message} ${className}`}>
                        <div className={s.user}>
                            <span>{m.user ? m.user.name : "Anon"}</span>
                        </div>
                        <div className={s.text}>
                            <span>{m.message}</span>
                        </div>
                        <div ref={messagesAncorRef}></div>
                    </div>
                )
            })}
        </div>
    );
};

