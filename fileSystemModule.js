const fs = require('fs');

//Create File
fs.writeFile('example.txt',"This File is my First File",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('File Successfully Created!');
        // Read File
        fs.readFile('ada.txt','utf8',(err,file)=>{
            if(err)
                console.log(err);
            else
                console.log(file);


        });
    }

});


//Rename the file

fs.rename('example.txt','exm.txt',(err)=>{

    if(err)
        console.log(err);
    else
        console.log('Successfully Renamed!!!!');

});

//Add more content to existing file
fs.appendFile('ada.txt',' This the recently updated content',(err)=>{

    if(err){
        console.log(err);
    }
    else  {
        console.log('Content is added to file!');
    }

});

fs.unlink('exm.txt',(err)=>{

    if(err){
        console.log('Error occured ',err);
    }
    else{
        console.log('Successfully Deleted File!!');
    }

});