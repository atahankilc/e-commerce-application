import Item from "./Item";
import {useContext} from "react";
import ItemContext from "../context/item-context";

const ItemList = () => {

    const itemContext = useContext(ItemContext)

    const filterHandler = (e) => {
        itemContext.changeFilter(e.target.value)
    }

    return (
        <>
            <div className={"flex flex-row-reverse m-1 p-1 items-center"}>
                <select className={"m-1 p-1 border"}
                    name="Filter" onChange={filterHandler} required defaultValue={itemContext.filter}>
                    <option value="All">All Categories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Computer Components">Computer Components</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Snacks">Snacks</option>
                </select>
                <p className={"mx-2 px-2"}>Category Filter</p>
            </div>
            <div>
                {!!itemContext.isLoading && <p className={"py-2"}>Loading...</p>}
                {!itemContext.isLoading && itemContext.array.length > 0 && itemContext.array.map(item => (
                    <Item key={item._id} item={item}/>))}
                {!itemContext.isLoading && itemContext.array.length === 0 && <p>No Item To List</p>}
            </div>
        </>
    )
}

export default ItemList