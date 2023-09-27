import {AppRootStateType} from "@/app/store.ts";

export const selectMessages=(state:AppRootStateType) => state.chat.messages
export const selectTypingusers=(state:AppRootStateType) => state.chat.typingUsers