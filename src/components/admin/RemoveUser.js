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
        array.forEach(user => (list.push(<div key={user.username}><p>{user.username}</p>
            <button onClick={removeUser.bind(undefined, user.username)}>Remove User</button>
        </div>)))
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <p>Remove User</p>
            {list}
        </div>
    )
}

export default RemoveUser