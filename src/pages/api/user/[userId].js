import {MongoClient, ObjectId} from "mongodb";

async function details(req, res) {
    const userId = req.query.userId
    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")
    const result = await db.collection("users").aggregate([{
        $match: {
            _id: new ObjectId(userId)
        }
    }, {
        $lookup: {
            from: "ratings",
            localField: "username",
            foreignField: "username",
            as: "ratings"
        }
    }, {
        $lookup: {
            from: "reviews",
            localField: "username",
            foreignField: "username",
            as: "reviews"
        }
    }, {
        "$project": {
            "isAdmin": 0,
            "ratings._id": 0,
            "ratings.itemId": 0,
            "ratings.username": 0,
            "reviews.itemId": 0,
            "reviews.username": 0
        }
    }]).toArray()
    await client.close()
    res.status(200).json({user: result[0]})
}

export default details