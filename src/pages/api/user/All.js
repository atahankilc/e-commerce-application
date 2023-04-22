import {MongoClient} from "mongodb";

async function All(req, res) {
    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")
    const result = await db.collection("users").aggregate([{
        $match: {
            isAdmin: false,
        }
    }, {
        "$project": {
            "_id": 0,
            "isAdmin": 0
        }
    }]).toArray()
    await client.close()
    res.status(200).json({result: result})
}

export default All