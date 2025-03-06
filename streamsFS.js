const fs = require('fs');
const readstr = fs.createReadStream('./StarFleet Ships/Intrepid.txt','utf-8');
const writeFile = fs.createWriteStream('./StarFleet Ships/Voyager.txt');
readstr.on('data',(chunk)=>{
    console.log(chunk);
    writeFile.write(chunk);

});

// readFile vs readStream => readFile reads the file all at once unlike the stream where the file is broken down to chunks thus streams come in handy when reading large files.
