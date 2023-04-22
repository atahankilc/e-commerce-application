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
            rating: Math.max(Math.min(10, parseInt(ratingRef.current.value)), 0),
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
        <div className={"w-5/12 m-5 mx-auto border hover:shadow-xl"}>
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
                <div className={"flex flex-row bg-zinc-700 text-white p-2"}>
                    <p className={"mx-5"}>Rating ({item.ratings.length}) : {result.toFixed(2)} / 10</p>
                    {yourRating >= 0 && <p className={"mx-5"}>Your Rating : {yourRating}</p>}
                </div>
                <div className={"flex flex-col bg-zwhite text-black mt-0.5"}>
                    <p className={"p-2 mx-5"}>Reviews ({item.reviews.length})</p>
                    {item.reviews.length > 0 && item.reviews.map(review => (
                        <Review key={review._id} review={review} username={authContext.authConfig.username}/>))}
                </div>
            </div>
            {authContext.authConfig.isLogin && <div className={"flex flex-col"}>
                <div className={"flex flex-row my-1"}>
                    <input className={"m-1 p-0.5"} placeholder={"Rating"} type={"number"} max={10} ref={ratingRef}/>
                    <div className={"grow"}/>
                    <button className={"mx-2 w-28 bg-green-400 text-white"} onClick={rateHandler}>Rate Item</button>
                </div>
                <div className={"flex flex-row my-1"}>
                    <input className={"grow m-1 p-0.5"} placeholder={"Review"} type={"text"} ref={reviewRef}/>
                    <button className={"mx-2 w-28 bg-green-400 text-white"} onClick={reviewHandler}>Review Item</button>
                </div>
            </div>}
        </div>
    )
}

export default Item
