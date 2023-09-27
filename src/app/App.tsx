import {RouterProvider} from "react-router-dom";
import {router} from "@/pages/routes.tsx";
import s from "./app.module.css"

function App() {
    return (
        <div className={s.container}>
            <RouterProvider router={router}/>
        </div>

    )
}

export default App
