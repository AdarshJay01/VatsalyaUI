const readline = require('readline');

const rl = readline.createInterface({input : process.stdin,
                        output : process.stdout
});

let num1 = Math.floor((Math.random() * 10)+1);
let num2 = Math.floor((Math.random()*10)+1);

rl.question(`What is ${num1} + ${num2} \n  `,
    (userInput) =>{
        console.log('Your Input is '+userInput);
        if(userInput.trim()==(num1+num2)){
            console.log('Your Answer is correct');
            rl.close();
        }
        else{
            rl.setPrompt('Incorrect');
            rl.prompt();

            rl.on('line',(userInput)=>{
              if(userInput.trim()==(num1+num2)){
                console.log('Your Answer is Correct!');
                rl.close();
            }

              else{
                rl.setPrompt(`Please Try Again! \n ${userInput}`);
                rl.prompt();
              }
            })

        }
    }
);

rl.on('close',()=>{
    console.log('Thank You for Playing!');

});



