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
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <AddUser reloadHandler={reloadHandler}/>
                <RemoveUser reloadFlag={reloadFlag} reloadHandler={reloadHandler}/>
                <AddItem/>
                <RemoveItem/>
            </div>
        )
    } else {
        return (
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <p> Login as Admin</p>
            </div>
        )
    }
}

export default AdminPage