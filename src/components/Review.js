const Review = ({review, username}) => {
    return (
        <p style={{
            border: "solid",
            background: `${review.username === username ? "green" : "white"}`,
            margin: "5px",
            padding: "5px"
        }}> {review.username === username && "Your Review: "} {review.review} </p>
    )
}

export default Review