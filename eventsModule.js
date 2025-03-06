const event = require('events');
const { EventEmitter } = require('stream');

const eventEmitter = new event();

eventEmitter.on('hello',()=>{
    console.log('Event Trigger Occured');
});
// Events with arguments

eventEmitter.on('newT',(n1,n2)=>{
    console.log(n1+n2);

});

class Person extends EventEmitter{
    constructor(name){
        super();
        this._name = name;

    }

    get nam(){
        return this._name;
    }
}
let ray = new Person('Pedro');
ray.on('name',()=>{
    console.log('My name is '+ ray.nam);
});


let chritina = new Person('Chritina');
chritina.on('name',()=>{
    console.log(chritina.nam + ' is parts Sales Team');

});


ray.emit('name');
chritina.emit('name');


eventEmitter.emit('hello');
eventEmitter.emit('newT',56,44);