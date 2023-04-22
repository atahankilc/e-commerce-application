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
        <div className={"flex flex-row m-2 p-2 bg-zinc-700"}>
            <input className={"px-1"} ref={usernameRef} placeholder={"username"}/>
            <div className={"grow"}/>
            <button className={"bg-green-300 text-white py-1 px-2 hover:bg-green-500"} onClick={addUser}>Add User</button>
        </div>
    )
}

export default AddUser