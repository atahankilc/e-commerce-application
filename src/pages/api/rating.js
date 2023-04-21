import {MongoClient, ObjectId} from "mongodb";

async function rating(req, res) {
    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")

    if (req.method === "PUT") {
        const result = await db.collection("ratings").updateOne({
                itemId: new ObjectId(req.body.itemId),
                username: req.body.username
            },
            {
                $set: {rating: req.body.rating},
                $setOnInsert: {
                    itemId: new ObjectId(req.body.itemId),
                    username: req.body.username
                }
            },
            {upsert: true})
        await client.close()
        res.status(200).json({
            action: "rating",
            upsertedCount: result.upsertedCount,
            modifiedCount: result.modifiedCount
        })
    }
}

export default rating