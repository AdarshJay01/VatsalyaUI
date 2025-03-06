const fs = require("fs");
//Synchronus 
fs.readFile("./ada.txt",(error,data)=>{
    if(error){
        console.log("Error occured",error);
    }
    else{
        console.log("Data is recovered",data.toString());
    }
})
//writing to files
fs.writeFile("./ada.txt",'Hello,World',()=>{
    console.log('file was written');
})

fs.writeFile("./ada2.txt","This means the file has been created",()=>{
    console.log("new file Exists!!!!");
})
//making directories
if(fs.existsSync('./assets')){
    fs.mkdir('./assets',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('Folder Created');
    });

}else{
    fs.rmdir('./assets',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('Folder Deleted');
    })
}
//delete files
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('File deleted');
    })
}