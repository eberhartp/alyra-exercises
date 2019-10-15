const readline = require("readline");
const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let solution = Math.floor(1 + Math.random() * 100);

console.log("Devinez un chiffre entre 1 et 100")

rli.on('line', (userInput) => {
    userInput = parseInt(userInput);

    if (userInput === solution) {
        console.log("Exact !");
        rli.close();
    } else {
        let responseString = "C'est";
        let diff = Math.abs(userInput - solution);
        if (diff <= 5)
            responseString += " un tout petit peu";
        else if (diff > 10)
            responseString += " beacoup";
        
        if (userInput > solution)
            responseString += " moins";
        else
            responseString += " plus";
        
        console.log(responseString);
    }
});