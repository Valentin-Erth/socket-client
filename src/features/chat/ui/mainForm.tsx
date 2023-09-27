import s from "./mainForm.module.css"
import {Link} from "react-router-dom";
import {ChangeEvent, useState} from "react";

const FIELDS = {
    username: "username",
    room: "room"
}
type FIELDSType = typeof FIELDS
export const MainForm = () => {
    // const {USERNAME, ROOM} = FIELDS
    const [values, setValues] = useState<FIELDSType>({username: "", room: ""})
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.currentTarget.name, e.currentTarget.value)
        setValues({...values, [e.currentTarget.name]: e.currentTarget.value})
    }
    const isDisabled = Object.values(values).some((v) => !v);//проверяет, заполнены ли все поля формы. Если хотя бы одно поле не заполнено, то disabled

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <h1 className={s.heading}> Join</h1>
                <form className={s.form}>
                    <input type={"text"}
                           name="username"
                           placeholder={"Username"}
                           value={values.username}
                           onChange={handleChange}
                           className={s.input}
                           autoComplete="off"
                    />
                    <input type={"text"}
                           name="room"
                           placeholder={"Room"}
                           value={values.room}
                           onChange={handleChange}
                           className={s.input}
                           autoComplete="off"/>
                    <Link to={`/chat?name=${values.username}&room=${values.room}`}>
                        <button disabled={isDisabled} type={"submit"} className={s.button}>
                            Sign In
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
