import {useContext} from "react";
import ItemContext from "../../context/item-context";

const RemoveItem = () => {

    const itemContext = useContext(ItemContext)

    const filterHandler = (e) => {
        itemContext.changeFilter(e.target.value)
    }

    const removeHandler = (id) => {
        const reqBody = {
            id: id
        }

        fetch("/api/item", {
            method: "DELETE",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.deletedCount > 0) {
                itemContext.requestReload()
                alert("item removed!")
            }
        })
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <p>Remove Item</p>
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <p>Filter</p>
                <select name="Filter" onChange={filterHandler} required defaultValue={itemContext.filter}>
                    <option value="All">All Categories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Computer Components">Computer Components</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </div>
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <p>Items</p>
                {itemContext.array.length > 0 && itemContext.array.map(item => (
                    <div key={item._id} style={{border: "solid", margin: "5px", padding: "5px"}}>
                        <p>Name: {item.name}</p>
                        <p>Description: {item.description}</p>
                        <p>Price: {item.price}</p>
                        <p>Seller: {item.seller}</p>
                        <a href={item.image}>Image: <img src={item.image} alt={"Item Image"}/></a>
                        {item.category === "Clothing" && <p>Size: {item.size}</p>}
                        {item.category === "Clothing" && <p>Colour: {item.colour}</p>}
                        {item.category === "Computer Components" && <p>Spec: {item.spec}</p>}
                        <button onClick={removeHandler.bind(undefined, item._id)}>Remove Item</button>
                    </div>))}
                {itemContext.array.length === 0 && <p>No Item To List</p>}
            </div>
        </div>
    )
}

export default RemoveItem
