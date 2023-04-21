import {useContext, useRef} from "react";
import ItemContext from "../../context/item-context";

const UserOperations = () => {

    const itemContext = useContext(ItemContext)
    const usernameRef = useRef()

    const addUser = () => {
        const reqBody = {
            username: usernameRef.current.value
        }

        fetch("/api/user", {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.matchedCount > 0 && data.upsertCount === 0) {
                alert("user already exists!")
            } else if (data.matchedCount === 0 && data.upsertCount > 0) {
                alert("user added!")
            }
        })
    }

    const removeUser = () => {
        const reqBody = {
            username: usernameRef.current.value
        }

        fetch("/api/user", {
            method: "DELETE",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.deleteCount > 0) {
                alert("user removed!")
                itemContext.requestReload()
            } else {
                alert("user not exists!")
            }
        })
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <p>Add User</p>
            <input ref={usernameRef} placeholder={"username"}/>
            <button onClick={addUser}>Add User</button>
            <button onClick={removeUser}>Remove User</button>
        </div>
    )
}

export default UserOperations