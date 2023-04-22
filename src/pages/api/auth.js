import {MongoClient} from "mongodb";

async function auth(req, res) {
    const client = await MongoClient.connect("mongodb+srv://admin_ceng495:apth9HShfcUp8fnI@cluster0.4dmnugs.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("e-commerce")
    if (req.body.password !== "") {
        const result = await db.collection("users").findOne({username: req.body.username, password:req.body.password})
        await client.close()
        if (result && result.isAdmin) {
            res.status(200).json({isLogin: false, isAdmin: true, username: result.username, userId: result._id})
        }
    } else {
        const result = await db.collection("users").findOne({username: req.body.username})
        await client.close()
        if (result && !result.isAdmin) {
            res.status(200).json({isLogin: true, isAdmin: false, username: result.username, userId: result._id})
        }
    }
    res.status(200).json({isLogin: false, isAdmin: false})
}

export default auth