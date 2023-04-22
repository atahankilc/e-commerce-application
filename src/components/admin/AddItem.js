import {useContext, useRef, useState} from "react";
import ItemContext from "../../context/item-context";

const AddItem = () => {

    const itemContext = useContext(ItemContext)
    const [itemCategory, setItemCategory] = useState("")
    const nameRef = useRef(null)
    const descriptionRef = useRef(null)
    const priceRef = useRef(null)
    const sellerRef = useRef(null)
    const imageRef = useRef(null)
    const sizeRef = useRef(null)
    const colourRef = useRef(null)
    const specRef = useRef(null)

    const addItem = () => {
        let reqBody
        if (itemCategory === "") {
            alert("Choose Category")
            return
        } else if (itemCategory === "Clothing") {
            reqBody = {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
                seller: sellerRef.current.value,
                image: imageRef.current.value,
                size: sizeRef.current.value,
                colour: colourRef.current.value,
                category: itemCategory
            }
        } else if (itemCategory === "Computer Components") {
            reqBody = {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
                seller: sellerRef.current.value,
                image: imageRef.current.value,
                spec: specRef.current.value,
                category: itemCategory
            }
        } else {
            reqBody = {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
                seller: sellerRef.current.value,
                image: imageRef.current.value,
                category: itemCategory
            }
        }

        fetch("/api/item", {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                itemContext.requestReload()
                alert("item added!")
            }
        })
    }

    const categoryHandler = (e) => {
        setItemCategory(e.target.value)
    }

    return (
        <div className={"flex flex-col m-2 p-2 bg-zinc-700"}>
            <select className={"m-1 p-1"} name="Category" onChange={categoryHandler} required defaultValue={""}>
                <option value="">Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Computer Components">Computer Components</option>
                <option value="Monitors">Monitors</option>
                <option value="Snacks">Snacks</option>
            </select>
            <input className={"m-1 p-1"} ref={nameRef} placeholder={"Item Name"}/>
            <input className={"m-1 p-1"} ref={descriptionRef} placeholder={"Item Description"}/>
            <input className={"m-1 p-1"} ref={priceRef} placeholder={"Item Price"}/>
            <input className={"m-1 p-1"} ref={sellerRef} placeholder={"Item Seller"}/>
            <input className={"m-1 p-1"} ref={imageRef} placeholder={"Item Image"}/>
            {itemCategory === "Clothing" && <input className={"m-1 p-1"} ref={sizeRef} placeholder={"Item Size"}/>}
            {itemCategory === "Clothing" && <input className={"m-1 p-1"} ref={colourRef} placeholder={"Item Colour"}/>}
            {itemCategory === "Computer Components" && <input className={"m-1 p-1"} ref={specRef} placeholder={"Item Spec"}/>}
            <button className={"bg-green-300 text-white m-1 p-1 hover:bg-green-500"} onClick={addItem}>Add Item</button>
        </div>
    )
}

export default AddItem