import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {api} from "@/features/chat/api/socket.api.ts";

const slice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        typingUsers: [],
    },
    reducers: {
        setMessages: (state, action: PayloadAction<[]>) => {
            state.messages = action.payload
        },
        addMessage: (state, action: PayloadAction<any>) => {
            const index=state.typingUsers.findIndex((u:any)=>u.id===action.payload.user.id)
            if(index!==-1) state.typingUsers.splice(index,1)
            // state.typingUsers.filter((u:any)=>u.id!==action.payload.user.id)
            state.messages.push(action.payload)
        },
        typingUserAdded:(state, action: PayloadAction<any>)=>{
            const index=state.typingUsers.findIndex((u:any)=>u.id===action.payload.user.id)
            if(index!==-1) {
                state.typingUsers.splice(index, 1).push(action.payload)
            }
            // state.typingUsers.filter((u:any)=>u.id!==action.payload.user.id).push(action.payload)
        }

    }
})
const creatConnection = createAsyncThunk("chat/getMessages", (_, thunkAPI) => {
    const {dispatch} = thunkAPI
    api.creatConnection()
    api.subscribe((messages: any, fn:(data:string)=>void) => {
            dispatch(chatActions.setMessages(messages))
        fn(" data from front")
        }, (message: any) => {
            dispatch(chatActions.addMessage(message))
        },
        (user: any) => {
            dispatch(chatActions.typingUserAdded(user))
        }
    )
})
const setClientName = createAsyncThunk("chat/setClientName", (name: string) => {
    api.sendName(name)
})
const sendMessage = createAsyncThunk("chat/sendMessage", (message: string) => {
    api.sendMessage(message)
})
const typeMessage = createAsyncThunk("chat/typeMessage", () => {
    api.typeMessage()
})
const destroyConnection = createAsyncThunk("chat/destroyConnection", () => {
    api.destroyConnection()
})

export const chatSlice = slice.reducer
export const chatActions = slice.actions
export const chatThunks = {creatConnection, destroyConnection, setClientName, sendMessage, typeMessage}

