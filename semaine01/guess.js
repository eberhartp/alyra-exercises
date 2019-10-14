const readline = require("readline");
const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let solution = Math.floor(1 + Math.random() * 10);

rli.on('line', (userInput) => {
    console.log(`You have entered ${userInput}`);
    userInput = parseInt(userInput);
    if (userInput < solution) {
        console.log("Try guessing higher");
    } else if (userInput === solution) {
        console.log("Congrats");
        rli.close();
    } else {
        console.log("Try guessing lower");
    }
});