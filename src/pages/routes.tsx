import { MainForm } from "@/features/chat/ui/mainForm.tsx";
import {createBrowserRouter} from "react-router-dom";
import {Chat} from "@/features/chat/ui/chat.tsx";

export const router=createBrowserRouter([
    {
        path: '/',
        element: <MainForm/>
    },
    {
        path: '/chat',
        element: <Chat/>
    },
    {
        path: "/404",
        element: <h1>404: PAGE NOT FOUND</h1>
},
// {
//     path: "*",
//         element: <Navigate to={"/404"}/>
// },
])