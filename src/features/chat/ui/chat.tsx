import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {io} from "socket.io-client";

import s from "./chat.module.css"
import icon from '../../../assets/emodji.svg'
import EmojiPicker from "emoji-picker-react";
import {Messages} from "@/features/chat/ui/messages.tsx";

// const socket = io("")
// const socket = io("http://localhost:3009");
const socket = io("https://socket-server-three-kappa.vercel.app/", {
    transports: ['websocket', 'polling', 'flashsocket']
});
// type EmojiObjectType = {
//     emoji: string;
//     names: string[];
//     unicode: string;
//     activeSkinTone: string;
// }
export const Chat = () => {
    // console.log('Chat rendered')
    const navigate = useNavigate()
    const location = useLocation()
    const [params, setParams] = useState<Record<string, string> | null>(null)
    console.log(params)
    const [isopen, setIsOpen] = useState<boolean>(false)
    const [state, setState] = useState<{
        user: { name: string },
        message: string
    }[]>([])
    const [message, setMessage] = useState("")
    const [users, setUser] = useState(0)

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(location.search))//перобразуем строку после ?,из параметров запросаиз урла в по ключ-значению в объект
        setParams(searchParams)
        socket.emit("join", searchParams)
    }, [location.search])
    // console.log("params", params)

    useEffect(() => {
        socket.on("message", ({data}) => {
            // console.log("data",data)
            setState((prevState) => [...prevState, data])
        })
    }, []);
    useEffect(() => {
        socket.on("room", ({data}) => {
            console.log("users", data.users)
            setUser(data.users.length)
        })
    }, []);
    // console.log("state", state)
    const leftRoom = () => {
        socket.emit("leftRoom", {params})
        navigate("/")
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value)
    }
    const onEmodjiClick = (EmojiObject: any) => {
        console.log(EmojiObject);
        setMessage(`${message} ${EmojiObject.emoji}`)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message) return
        socket.emit("sendMessage", {message, params})
        setMessage("")
    }
    return (
        <div className={s.wrap}>
            <div className={s.header}>
                <div className={s.title}>{params?.room}</div>
                <div className={s.user}>
                    {users} users in with room
                </div>
                <button className={s.left} onClick={leftRoom}>
                    Left the room
                </button>
            </div>

            <div className={s.messages}>
                <Messages messages={state} name={params?.name ?? "Default name"}/>
            </div>
            <form className={s.form} onSubmit={handleSubmit}>
                <input type={"text"}
                       name="message"
                       placeholder={"What do you want to write?"}
                       value={message}
                       onChange={handleChange}
                       className={s.input}
                       autoComplete="off"
                       required
                />
                <div className={s.emoji}><img onClick={() => {
                    setIsOpen(!isopen)
                }} src={icon} alt=""/>
                    {isopen &&
                        <div className={s.emojies}>
                            <EmojiPicker onEmojiClick={onEmodjiClick}/>
                        </div>}
                </div>
                <div className={s.button}>
                    <input type={"submit"} value={"Send a message"}/>
                </div>
            </form>
        </div>
    )
}

// export const Chat = () => {
//     // console.log('App rendered')
//     const messages = useAppSelector(selectMessages)
//     const typingUsers = useAppSelector(selectTypingusers)
//     const dispatch = useAppDispatch()
//     // подписываемся, получаем мессаджи с бэка
//     useEffect(() => {
//         dispatch(chatThunks.creatConnection())
//         return () => {
//             dispatch(chatThunks.destroyConnection())
//         }
//     }, [])
//
//     // const [messages, setMessages] = useState<{
//     //     message: string,
//     //     id: string,
//     //     user: {
//     //         id: string,
//     //         name: string
//     //     }
//     // }[]>([])
//     const [message, setMessage] = useState('Hello')
//     const [name, setName] = useState('Valek')
//     const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
//     const [lastScrollTop, setLastScrollTop] = useState(0)
//     useEffect(() => {
//         if (isAutoScrollActive) {
//             messagesAncorRef.current?.scrollIntoView({behavior: "smooth"})// плавная прокрутка до последнего элемента через ref
//         }
//     }, [messages])
//
//     const messagesAncorRef = useRef<HTMLDivElement>(null)
//
//     return (
//         <div className={s.box}>
//             <div className={s.content} onScroll={(e) => {
//                 // console.log(e.currentTarget.scrollTop)
//                 const element = e.currentTarget
//                 const maxScrollPosition = element.scrollHeight - element.clientHeight
//                 if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollHeight)) {
//                     setIsAutoScrollActive(true)
//                 } else {
//                     setIsAutoScrollActive(false)
//                 }
//                 setLastScrollTop(element.scrollTop)
//             }}>
//                 {messages && messages.map((m: any) => {
//                     return (
//                         <div key={m.id}>
//                             <b>{m.user.name}:</b> {m.message}
//                             <hr/>
//                         </div>
//                     )
//                 })}
//                 {typingUsers && typingUsers.map((u: any) => {
//                     return (
//                         <div key={u.id}>
//                             <b>{u.user.name}:</b> ...
//                         </div>
//                     )
//                 })}
//                 <div ref={messagesAncorRef}></div>
//             </div>
//             <div>
//                 <input type="text" style={{color: "black", marginTop: "5px"}} value={name}
//                        onChange={(e) => setName(e.currentTarget.value)}/>
//                 <button onClick={() => {
//                     dispatch(chatThunks.setClientName(name))
//                 }} style={{color: "black", padding: "3px", margin: "5px"}}>Send name
//                 </button>
//             </div>
//             <div>
//                 <textarea value={message} onKeyDown={() => {
//                     dispatch(chatThunks.typeMessage())
//                 }} onChange={(e) => setMessage(e.currentTarget.value)}
//                           style={{color: "black", marginTop: "5px"}}></textarea>
//                 <button onClick={() => {
//                     dispatch(chatThunks.sendMessage(message))
//                     setMessage("")
//                 }} style={{color: "black", padding: "3px", margin: "5px"}}>Send
//                 </button>
//             </div>
//             <div>
//             </div>
//         </div>
//     )
// }

