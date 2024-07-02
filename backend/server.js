const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000


const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassLocker';
client.connect();


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const password = req.body
    console.log(password);
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);
    //console.log('Inserted documents =>', findResult);
    res.send({ success: true, result:findResult})
})

app.delete('/', async (req, res) => {
    const password = req.body
    console.log(password);
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})