import Item from "./Item";
import {useContext} from "react";
import ItemContext from "../context/item-context";

const ItemList = () => {

    const itemContext = useContext(ItemContext)

    const filterHandler = (e) => {
        itemContext.changeFilter(e.target.value)
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
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
                {!!itemContext.isLoading && <p>Loading...</p>}
                {!itemContext.isLoading && itemContext.array.length > 0 && itemContext.array.map(item => (
                    <Item key={item._id} item={item}/>))}
                {!itemContext.isLoading && itemContext.array.length === 0 && <p>No Item To List</p>}
            </div>
        </div>
    )
}

export default ItemList