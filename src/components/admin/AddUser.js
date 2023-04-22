import {useContext, useRef} from "react";
import PageContext from "../../context/page-context";

const AddUser = ({reloadHandler}) => {

    const pageContext = useContext(PageContext)
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
                pageContext.requestReload()
                reloadHandler()
            }
        })
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <p>Add User</p>
            <input ref={usernameRef} placeholder={"username"}/>
            <button onClick={addUser}>Add User</button>
        </div>
    )
}

export default AddUser