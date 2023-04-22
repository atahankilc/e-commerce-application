const Review = ({review, username}) => {
    return (
        <div className={"flex flex-row items-center border"}>
            {review.username === username && <p className={"p-1 bg-blue-400 text-white"}>Your Review</p>}
            <p className={"grow p-1"}>  {review.review} </p>
        </div>
    )
}

export default Review