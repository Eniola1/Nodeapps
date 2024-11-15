const dbConnection = require('./mongodb');
const express = require('express');
const app = express();
const mongodb = require('mongodb');

app.use(express.json());

app.get('/get', async (req, resp)=>{
    let data = await dbConnection();
    data = await data.find().toArray();
    resp.send(data)
});

app.post('/post', async (req, resp)=>{
    let data = await dbConnection();
    let result = await data.insertOne(req.body);
    resp.send(result);
});

app.put('/update', async (req, resp)=>{
    let data = await dbConnection();
    let result = await data.updateOne({name:req.body.name}, {$set:req.body});
    resp.send(result);
});

app.delete('/delete/:id', async (req, resp)=>{
    let data = await dbConnection();
    let result = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    resp.send(result);
});

app.listen(5000);
