function factoriel(integer) {
    if (integer < 1)
        return 1;
    return factoriel(integer - 1) * integer;
}

let number = parseInt(process.argv[2]);
if (isNaN(number)) {
    console.log("node factoriel.js <integer>");
    process.exit(1);
}

console.log(`${number} ! = ${factoriel(number)}`);