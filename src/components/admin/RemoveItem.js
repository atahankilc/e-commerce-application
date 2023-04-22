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
        <div className={"flex flex-col m-2 p-2 bg-zinc-700"}>
            <div className={"flex flex-row-reverse m-1 p-1 items-center"}>
                <select className={"m-1 p-1 border"}
                        name="Filter" onChange={filterHandler} required defaultValue={itemContext.filter}>
                    <option value="All">All Categories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Computer Components">Computer Components</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Snacks">Snacks</option>
                </select>
                <p className={"mx-2 px-2 text-white"}>Category Filter</p>
            </div>
            <div>
                {itemContext.array.length > 0 && itemContext.array.map(item => (
                    <div key={item._id} className={"flex flex-col w-fill m-5 mx-auto border hover:shadow-xl"}>
                        <div>
                            <div className={"flex bg-zinc-700 text-white h-10 items-center p-2"}>
                                <p className={"mx-5"}>Name: {item.name}</p>
                            </div>
                            <div style={{width: "100%", height: "400px"}} className={"overflow-hidden"}>
                                <a href={item.image}><img src={item.image} alt={"Item Image"} style={{
                                    width: "100%"
                                }} className={"z-0"}/></a>
                            </div>
                            <div className={"flex flex-col bg-zinc-500 text-white p-2"}>
                                <p className={"mx-5"}>Description: {item.description}</p>
                                <p className={"mx-5"}>Price: {item.price}</p>
                                <p className={"mx-5"}>Seller: {item.seller}</p>
                                {item.category === "Clothing" && <p className={"mx-5"}>Size: {item.size}</p>}
                                {item.category === "Clothing" && <p className={"mx-5"}>Colour: {item.colour}</p>}
                                {item.category === "Computer Components" && <p className={"mx-5"}>Spec: {item.spec}</p>}
                            </div>
                        </div>
                        <button className={"bg-red-300 text-white p-1 hover:bg-red-500"}
                                onClick={removeHandler.bind(undefined, item._id)}>Remove Item
                        </button>
                    </div>))}
                {itemContext.array.length === 0 && <p>No Item To List</p>}
            </div>
        </div>
    )
}

export default RemoveItem
