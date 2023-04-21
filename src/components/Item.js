import {useRef} from "react";
import Review from "./Review";

const Item = ({item, authConfig, setRequestItemFlag}) => {

    const ratingRef = useRef()
    const reviewRef = useRef()

    const rateHandler = () => {
        const reqBody = {
            rating: parseInt(ratingRef.current.value),
            itemId: item._id,
            username: authConfig.username
        }

        fetch("/api/rating", {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount > 0 || data.upsertedCount > 0) {
                setRequestItemFlag(prevState => {
                    return !prevState
                })
            }
        })
    }

    const reviewHandler = () => {
        const reqBody = {
            review: reviewRef.current.value,
            itemId: item._id,
            username: authConfig.username
        }

        fetch("/api/review", {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount > 0 || data.upsertedCount > 0) {
                setRequestItemFlag(prevState => {
                    return !prevState
                })
            }
        })
    }

    const removeHandler = () => {
        const reqBody = {
            id: item._id
        }

        fetch("/api/item", {
            method: "DELETE",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.deletedCount > 0) {
                setRequestItemFlag(prevState => {
                    return !prevState
                })
                alert("item removed!")
            }
        })
    }

    let result = 0
    let yourRating = -1
    if(item.ratings.length > 0) {
        item.ratings.forEach((ratingObject) => (
           result += ratingObject.rating
        ))
        item.ratings.forEach((ratingObject) => (
            ratingObject.username === authConfig.username ? yourRating = ratingObject.rating : undefined
        ))
        result /= item.ratings.length
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <div>
                <p>Name: {item.name}</p>
                <p>Description: {item.description}</p>
                <p>Price: {item.price}</p>
                <p>Seller: {item.seller}</p>
                <a href={item.image}>Image: <img src={item.image} alt={"Item Image"}/></a>
                {item.category === "Clothing" && <p>Size: {item.size}</p>}
                {item.category === "Clothing" && <p>Colour: {item.colour}</p>}
                {item.category === "Computer Components" && <p>Spec: {item.spec}</p>}
                <p style={{border: "solid", margin: "5px", padding: "5px"}}>
                    Rating: {result} / 10
                    <br/>
                    Rating Count: {item.ratings.length}
                    <br/>
                    {yourRating >= 0 && `Your Rating : ${yourRating}`}
                </p>
                <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                    <p>Reviews</p>
                    {item.reviews.length > 0 && item.reviews.map(review => (
                        <Review key={review._id} review={review} username={authConfig.username}/>))}
                    {item.reviews.length === 0 && <p>- No Review To List -</p>}
                </div>
            </div>
            {authConfig.isLogin && !authConfig.isAdmin && <div>
                <input placeholder={"Rating"} type={"number"} max={10} ref={ratingRef}/>
                <button onClick={rateHandler}>Rate Item</button>
                <input placeholder={"Review"} type={"text"} ref={reviewRef}/>
                <button onClick={reviewHandler}>Review Item</button>
            </div>}
            {authConfig.isAdmin && <div>
                <button onClick={removeHandler}>Remove Item</button>
            </div>}
        </div>
    )
}

export default Item

/*
Name The name of the item
Description The description of the item
Price The price of the item, choice of currency is left to you
Seller The seller of the item
Image The image showing the item. You do not need to implement image upload, a hyperlink to an image
file on the Internet is fine
Size The size of the item, only relevant if the item is an article of clothing
Colour The colour of the item, only relevant if the item is an article of clothing
Spec The amount of RAM the item has or the dimensions of the screen, only relevant for computer compo‐
nents and monitors
 */