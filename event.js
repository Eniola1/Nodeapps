const express = require('express');
const EventEmitter = require('events');
const event = new EventEmitter();
const app = express();

let count = 0;

event.on("countApiRequest", ()=>{
    count++;
    console.log("Api request count is:"+ count);
});

app.get("/", (req, resp)=>{
    resp.send("basic api");
    event.emit("countApiRequest");
});

app.listen(5000);