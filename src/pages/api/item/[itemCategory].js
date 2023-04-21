import {MongoClient} from "mongodb";

async function filteredItem(req, res) {
    const itemCategory = req.query.itemCategory
    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")
    const result = await db.collection("items").find({category: itemCategory}).toArray()
    await client.close()
    res.status(200).json({result: result})
}

export default filteredItem