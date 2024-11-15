const express = require("express");
const con = require("./mysqlConfig");
const app = express();  

app.use(express.json());

app.get("/", (req, resp)=>{
    con.query("select * from patients",(err, result)=>{
        if(err){resp.send("error in api")}
        else{resp.send(result)}        
    });
});

app.post("/", (req, resp)=>{
    const data = req.body;
    con.query("INSERT INTO patients SET?", data, (error, result, fields)=>{
        if(error) throw error;
        resp.send(result)
    })
});

app.delete("/:id", (req, resp)=>{
    con.query("DELETE FROM patients WHERE id ="+req.params.id,(error, result)=>{
        if(error) throw error;
        resp.send(result)
    })
});

app.listen(5000);