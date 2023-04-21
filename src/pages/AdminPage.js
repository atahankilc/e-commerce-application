import AddItem from "../components/admin/AddItem";
import UserOperations from "../components/admin/UserOperations";
import RemoveItem from "../components/admin/RemoveItem";
import {useContext} from "react";
import AuthContext from "../context/auth-context";

const AdminPage = () => {

    const authContext = useContext(AuthContext)

    if (!!authContext.authConfig.isAdmin) {
        return (
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <UserOperations/>
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