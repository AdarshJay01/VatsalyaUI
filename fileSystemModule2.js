//For Folder based manupilation


const fs = require('fs');
//Create a folder
fs.mkdir('Trial',(err)=>{

    if(err)
        console.log(err);
    else{
        console.log('Folder Created !');
    }

});

//Remove folder .
fs.rmdir('Tutorial',(err)=>{

    if(err){
        console.log(err);
    }

    else{
        console.log('Folder has been removed');
    }

});

//Create a new File in a New Folder

fs.mkdir('StarFleet Ships',(err)=>{
    if(err){
        console.log(err);

    }
    else{
        fs.writeFile('./StarFleet Ships/Galaxy.txt',': The Galaxy class was introduced in the late 24th century and served as a prominent exploration vessel for Starfleet.',(err)=>{
            if(err)
                console.log(err);
            else{
                console.log('New StarShip Added');
            }

        });
    }

});

fs.readdir('StarFleet Ships',(err,files)=>{
    if(err)
        console.log(err);
    else{
        for(let file of files){
            fs.readFile('./StarFleet Ships/'+file,'utf-8',(err,content)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(content);
                }
            });
        }
    }

});