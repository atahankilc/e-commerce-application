import {MongoClient} from "mongodb";

async function index(req, res) {
    const username = req.body.username

    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")

    if (req.method === "PUT") {
        const result = await db.collection("users").updateOne({username: username},
            {
                $setOnInsert: {username: username, isAdmin: false}
            },
            {upsert: true})
        await client.close()
        res.status(200).json({
            action: "add",
            matchedCount: result.matchedCount,
            upsertCount: result.upsertedCount
        })
    } else if (req.method === "DELETE") {
        const resultUsers = await db.collection("users").deleteOne({username: username})
        const resultRatings = await db.collection("ratings").deleteMany({username: username})
        const resultReviews = await db.collection("reviews").deleteMany({username: username})
        await client.close()
        res.status(200).json({
            action: "delete",
            deleteCount: resultUsers.deletedCount
        })
    }
}

export default index