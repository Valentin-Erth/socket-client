import {chatSlice} from "@/features/chat/model/chat.slice.ts";
import {configureStore} from "@reduxjs/toolkit";

export const store=configureStore({
    reducer: {
        chat: chatSlice
    },

})
export type AppRootStateType=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch