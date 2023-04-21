import {useRef, useState} from "react";

const AddItem = ({setRequestItemFlag}) => {
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
                setRequestItemFlag(prevState => {return !prevState})
                alert("item added!")
            }
        })
    }

    const categoryHandler = (e) => {
        setItemCategory(e.target.value)
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <p>Add Item</p>
            <select name="Category" onChange={categoryHandler} required defaultValue={""}>
                <option value="">Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Computer Components">Computer Components</option>
                <option value="Monitors">Monitors</option>
                <option value="Snacks">Snacks</option>
            </select>
            <input ref={nameRef} placeholder={"Item Name"}/>
            <input ref={descriptionRef} placeholder={"Item Description"}/>
            <input ref={priceRef} placeholder={"Item Price"}/>
            <input ref={sellerRef} placeholder={"Item Seller"}/>
            <input ref={imageRef} placeholder={"Item Image"}/>
            {itemCategory === "Clothing" && <input ref={sizeRef} placeholder={"Item Size"}/>}
            {itemCategory === "Clothing" && <input ref={colourRef} placeholder={"Item Colour"}/>}
            {itemCategory === "Computer Components" && <input ref={specRef} placeholder={"Item Spec"}/>}
            <button onClick={addItem}>Add Item</button>
        </div>
    )
}

export default AddItem