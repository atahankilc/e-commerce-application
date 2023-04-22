import {useContext, useRef} from "react";
import Review from "./Review";
import ItemContext from "../context/item-context";
import AuthContext from "../context/auth-context";

const Item = ({item}) => {

    const authContext = useContext(AuthContext)
    const itemContext = useContext(ItemContext)
    const ratingRef = useRef()
    const reviewRef = useRef()

    const rateHandler = () => {
        const reqBody = {
            rating: Math.max(Math.min(10, parseInt(ratingRef.current.value)),0),
            itemId: item._id,
            username: authContext.authConfig.username
        }

        fetch("/api/rating", {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount > 0 || data.upsertedCount > 0) {
                itemContext.requestReload()
            }
        })
    }

    const reviewHandler = () => {
        const reqBody = {
            review: reviewRef.current.value,
            itemId: item._id,
            username: authContext.authConfig.username
        }

        fetch("/api/review", {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount > 0 || data.upsertedCount > 0) {
                itemContext.requestReload()
            }
        })
    }

    let result = 0
    let yourRating = -1
    if (item.ratings.length > 0) {
        item.ratings.forEach((ratingObject) => (
            result += ratingObject.rating
        ))
        item.ratings.forEach((ratingObject) => (
            ratingObject.username === authContext.authConfig.username ? yourRating = ratingObject.rating : undefined
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
                <a href={item.image}>Image: <img src={item.image} alt={"Item Image"} style={{
                    width: "100%",
                    maxWidth: "100px"
                }}/></a>
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
                        <Review key={review._id} review={review} username={authContext.authConfig.username}/>))}
                    {item.reviews.length === 0 && <p>- No Review To List -</p>}
                </div>
            </div>
            {authContext.authConfig.isLogin && <div>
                <input placeholder={"Rating"} type={"number"} max={10} ref={ratingRef}/>
                <button onClick={rateHandler}>Rate Item</button>
                <input placeholder={"Review"} type={"text"} ref={reviewRef}/>
                <button onClick={reviewHandler}>Review Item</button>
            </div>}
        </div>
    )
}

export default Item
