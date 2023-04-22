import {useContext, useState} from "react";
import AddItem from "../components/admin/AddItem";
import AddUser from "../components/admin/AddUser";
import RemoveItem from "../components/admin/RemoveItem";
import RemoveUser from "../components/admin/RemoveUser";
import AuthContext from "../context/auth-context";

const AdminPage = () => {

    const authContext = useContext(AuthContext)
    const [reloadFlag, setReloadFlag] = useState(false)

    const reloadHandler = () => {
        setReloadFlag(prevState => {
            return !prevState
        })
    }

    if (!!authContext.authConfig.isAdmin) {
        return (
            <div className={"w-5/12 m-5 mx-auto"}>
                <div className={"flex flex-col p-1 border bg-zinc-300 mb-2"}>
                    <p className={"mx-1 px-1"}>User Operations</p>
                    <AddUser reloadHandler={reloadHandler}/>
                    <RemoveUser reloadFlag={reloadFlag} reloadHandler={reloadHandler}/>
                </div>
                <div className={"flex flex-col p-1 border bg-zinc-300"}>
                    <p className={"mx-1 px-1"}>Item Operations</p>
                    <AddItem/>
                    <RemoveItem/>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <p className={"p-2"}> Login as Admin</p>
            </div>
        )
    }
}

export default AdminPage