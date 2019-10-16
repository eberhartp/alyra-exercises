let min = 1;
let max = 100;
let searchNumber = parseInt(process.argv[2]);
let guess;

if (searchNumber < 1 || searchNumber > 100 || isNaN(searchNumber)) {
    console.log(`Please enter an integer between ${min} and ${max}`);
    console.log("node search.js <number>");
    process.exit(1);
}

do {
    guess = Math.floor((min + max) / 2);
    console.log(`My guess is ${guess}`);
    if (guess > searchNumber) {
        max = guess - 1;
    }
    if (guess < searchNumber) {
        min = guess + 1;
    }
} while (guess != searchNumber);

console.log(`The answer was ${searchNumber}`);