import {MongoClient, ObjectId} from "mongodb";

async function item(req, res) {
    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")

    if (req.method === "PUT") {
        const result = await db.collection("items").insertOne(req.body)
        await client.close()
        res.status(200).json({
            action: "add",
            acknowledged: result.acknowledged
        })
    } else if (req.method === "DELETE") {
        const resultItems = await db.collection("items").deleteOne({_id: new ObjectId(req.body.id)})
        const resultRatings = await db.collection("ratings").deleteMany({itemId: new ObjectId(req.body.id)})
        const resultReviews = await db.collection("reviews").deleteMany({itemId: new ObjectId(req.body.id)})
        await client.close()
        res.status(200).json({
            action: "delete",
            deletedCount: resultItems.deletedCount
        })
    }
}
export default item