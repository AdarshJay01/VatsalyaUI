//stream

const fs = require('fs');

//Read Stream
const readStream = fs.createReadStream('./streamtest.txt');
readStream.on('data',(chunk)=>{
    console.log('<------------ NEW CHUNK DISPLAYED --------------->');
    console.log(chunk.toString());

});