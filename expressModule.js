const exp = require('express');
const path = require('path');
const bodypar = require('body-parser');
const joi=require('joi');

const app = exp();

//Static folder
//Helps us to parse url encoded forms
app.use(bodypar.urlencoded({extended:false}));
app.use('/public',exp.static(path.join(__dirname,'Tutorial')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Tutorial','form.html'));

});
app.post('/',(req,res)=>{
    console.log(req.body);
    const schema = joi.object().keys({
        email : joi.string().trim().email().required(),
        password : joi.string().min(5).max(10).required()
    });
    joi.valid(req.body,schema,(err,result)=>{
        if(err){
            res.send('Error has Occured');
            console.log(err);
        }
        console.log(result);
        res.sendFile(path.join(__dirname,'Tutorial','main.html'));
    })
    //database work
    


});
app.get('/exm/:name/:age',(req,res)=>{

    console.log(req.params);
    res.send(req.params.name+" : "+req.params.age);

});

app.listen(3000);