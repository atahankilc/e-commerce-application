import Item from "./Item";
import {useEffect, useState} from "react";

const ItemList = ({authConfig, requestItemFlag, setRequestItemFlag}) => {
    const [itemArray, setItemArray] = useState([])

    const [filter, setFilter] = useState("All")

    const filterHandler = (e) => {
        setFilter(e.target.value)
    }

    const fetchItemsHandler = () => {
        fetch(`/api/item/${filter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            setItemArray(data.result)
            console.log(data.result)
        })
    }

    useEffect(() => {
        fetchItemsHandler()
    }, [requestItemFlag, filter])

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <p>Filter</p>
                <select name="Filter" onChange={filterHandler} required defaultValue={""}>
                    <option value="All">All Categories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Computer Components">Computer Components</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </div>
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <p>Items</p>
                {itemArray.length > 0 && itemArray.map(item => (
                    <Item key={item._id} item={item} authConfig={authConfig} setRequestItemFlag={setRequestItemFlag}/>))}
                {itemArray.length === 0 && <p>No Item To List</p>}
            </div>
        </div>
    )
}

export default ItemList