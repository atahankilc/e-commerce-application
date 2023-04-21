import {MongoClient} from "mongodb";

async function auth(req, res) {
    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")
    const result = await db.collection("users").findOne({username: req.body.username})
    await client.close()

    if (result && !result.isAdmin && req.body.password === "") {
        res.status(200).json({isLogin: true, isAdmin: false, username: result.username, userId: result._id})
    } else if (result && result.isAdmin && result.password === req.body.password) {
        res.status(200).json({isLogin: false, isAdmin: true, username: result.username, userId: result._id})
    } else {
        res.status(200).json({isLogin: false, isAdmin: false})
    }
}

export default auth