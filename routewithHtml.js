const express = require('express');

const app = express();

app.get("", (req, resp)=>{
    resp.send(`<h1>Hi, This is the home page</h1>`);
});

app.get("/about", (req, resp)=>{
    resp.send("Hi, This is the about page");
});

app.get("/contact", (req, resp)=>{
    resp.send("Hi, This is the contact page");
});

app.listen(5000);