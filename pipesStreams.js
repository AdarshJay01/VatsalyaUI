const fs = require('fs');

//REQUIRES FOR COMPRESSION
const zlib = require('zlib');
//Pipe chains
const gzip = zlib.createGzip();
//source stream
const readStr = fs.createReadStream('./StarFleet Ships/Galaxy.txt','utf-8');

//destination
const writeStr = fs.createWriteStream('./StarFleet Ships/Enterprise-D.txt.gz','utf-8');

//pipe helps to send a readstream to a writestream
readStr.pipe(writeStr);

//compress our readstr to writestr
readStr.pipe(gzip).pipe(writeStr);