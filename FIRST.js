console.log("This is my first node program ")

//Exporting from other js files
const modu = require('./module');
const avg=modu(23,56,86);

console.log("Average is "+avg);

//Server Side coding
const http = require("http");

const server= http.createServer((req,resp)=>{
    resp.writeHead(200,{"content-type":"text/html"});
    resp.write("<h1>Wow this is a response!</h1>");
    resp.write("<button>Node Run!</button>");
    resp.end('Code has Executed');
})

//Port for server side code to run
server.listen(9898);