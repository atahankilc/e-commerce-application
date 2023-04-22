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
            reviews.push(<div className={"flex flex-row items-center border"}>
                <p className={"grow p-1"}>  {reviewObject.review} </p>
            </div>)
        ))
    }


    if (!!authContext.authConfig.isLogin) {
        return (
            <>
                {!isLoading && <div className={"w-5/12 m-5 mx-auto border"}>
                    {!isLoading &&
                        <div>
                            <div className={"flex flex-row bg-zinc-500 text-white p-2"}>
                                <p className={"mx-5"}>Username: {userConfig.username}</p>
                            </div>
                            <div className={"flex flex-row bg-zinc-700 text-white p-2"}>
                                <p className={"mx-5"}>Average of the User Ratings ({userConfig.ratings.length})
                                    : {result.toFixed(2)} / 10</p>
                            </div>
                            <div className={"flex flex-col bg-white text-black"}>
                                <p className={"mx-5 p-2"}>User Reviews ({reviews.length})</p>
                                {reviews}
                            </div>
                        </div>
                    }
                </div>}
                {!!isLoading && <p className={"py-2"}> Loading...</p>}
            </>
        )
    } else {
        return (
            <div>
                <p className={"p-2"}> Login as Regular User</p>
            </div>
        )

    }
}

export default UserPage