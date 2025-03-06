const http = require('http');
const fs = require("fs");

const server = http.createServer((req,res)=>{
    fs.readFile('./StarFleet Ships/Enterprise-D.txt','utf-8',(err,data)=>{
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('Error File!');
            return;
        }
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end(data);

    });

});

server.listen('2323');