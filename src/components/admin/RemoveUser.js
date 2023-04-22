import {useContext, useEffect, useState} from "react";
import ItemContext from "../../context/item-context";

const RemoveUser = ({reloadFlag, reloadHandler}) => {

    const itemContext = useContext(ItemContext)
    const [array, setArray] = useState([])

    const getEveryUser = () => {
        fetch("/api/user/All", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            setArray(data.result)
        })
    }

    const removeUser = (username) => {
        const reqBody = {
            username: username
        }

        fetch("/api/user", {
            method: "DELETE",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            itemContext.requestReload()
            reloadHandler()
        })
    }

    useEffect(() => {
        getEveryUser()
    }, [reloadFlag])

    const list = []
    if (array.length > 0) {
        array.forEach(user => (list.push(
            <div className={"flex flex-row my-0.5"} key={user.username}>
                <p className={"px-1 text-white"}>{user.username}</p>
                <div className={"grow"}/>
                <button className={"bg-red-300 text-white py-1 px-2 hover:bg-red-500"} onClick={removeUser.bind(undefined, user.username)}>Remove User</button>
            </div>
        )))
    }

    return (
        <div className={"flex flex-col m-2 p-2 bg-zinc-700"}>
            {list}
        </div>
    )
}

export default RemoveUser