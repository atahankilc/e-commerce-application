import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/auth-context";

const UserPage = () => {

    const authContext = useContext(AuthContext)
    const [userConfig, setUserConfig] = useState({ratings: [], reviews: []})
    const [isLoading, setIsLoading] = useState(false)

    const fetchHandler = () => {
        if (authContext.authConfig.userId !== undefined) {
            setIsLoading(true)
            fetch(`/api/user/${authContext.authConfig.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(data => {
                setUserConfig(data.user)
                setIsLoading(false)
            })
        }
    }

    useEffect(() => {
        setUserConfig({ratings: [], reviews: []})
        fetchHandler()
    }, [authContext.authConfig])

    let result = 0
    if (userConfig.ratings.length > 0) {
        userConfig.ratings.forEach((ratingObject) => (
            result += ratingObject.rating
        ))
        result /= userConfig.ratings.length
    }

    let reviews = []
    if (userConfig.reviews.length > 0) {
        userConfig.reviews.forEach((reviewObject) => (
            reviews.push(<p style={{border: "solid", margin: "5px", padding: "5px"}}>{reviewObject.review}</p>)
        ))
    }

    if (!!authContext.authConfig.isLogin) {
        return (
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                {!!isLoading && <p> Loading...</p>}
                {!isLoading &&
                    <div>
                        <p style={{border: "solid", margin: "5px", padding: "5px"}}>Username: {userConfig.username}</p>
                        <p style={{border: "solid", margin: "5px", padding: "5px"}}>
                            Ratings
                            <br/>
                            Average Rating: {result} / 10
                            <br/>
                            Rating Count: {userConfig.ratings.length}
                        </p>
                        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                            <p>Reviews</p>
                            {reviews}
                        </div>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div style={{border: "solid", margin: "5px", padding: "5px"}}>
                <p> Login as Regular User</p>
            </div>
        )

    }
}

export default UserPage