const http = require('http');

// http.createServer((req, resp)=>{

//     resp.write("Hello, Anil");
//     resp.end();

// }).listen(4500);

function datacontrol(req, resp)
{
    resp.write("Code step by step");
    resp.end();
}

http.createServer(datacontrol).listen(4500);

