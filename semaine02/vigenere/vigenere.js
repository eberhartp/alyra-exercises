const program = require("commander");

function chiffrementVigenere(mot, motChiffre) {
    let cypheredText = "";
    motChiffre = motChiffre.toUpperCase();

    for (let i = 0; i < mot.length; i++) {
        let charCode = mot.charCodeAt(i);
        let chiffre = motChiffre.charCodeAt(i % motChiffre.length) - 0x40;

        if (0x40 < charCode && charCode < 0x5B)
            charCode = (charCode - 0x41 + chiffre) % 26 + 0x41;
        if (0x60 < charCode && charCode < 0x7B)
            charCode = (charCode - 0x61 + chiffre) % 26 + 0x61;

        cypheredText += String.fromCharCode(charCode);
    }
    
    return cypheredText;
}

function dechiffrementVigenere(mot, motChiffre) {
    let cypheredText = "";
    motChiffre = motChiffre.toUpperCase();

    for (let i = 0; i < mot.length; i++) {
        let charCode = mot.charCodeAt(i);
        let chiffre = motChiffre.charCodeAt(i % motChiffre.length) - 0x40;

        if (0x40 < charCode && charCode < 0x5B)
            charCode = (charCode - 0x41 - chiffre) % 26 + 0x41;
        if (0x60 < charCode && charCode < 0x7B)
            charCode = (charCode - 0x61 - chiffre) % 26 + 0x61;

        cypheredText += String.fromCharCode(charCode);
    }
    
    return cypheredText;
}

let mot;
let motChiffre;

program
    .version("1.0.0")
    .description("Chiffre et déchiffre des messages par la méthode de Vigenère")
    .usage("[options] <message> <cle>")
    .option("-d, --dechiffre", "Dechiffrer le message avec la clé donnée")
    .arguments("<message> <cle>")
    .action(function(message, cle){
        mot = message;
        motChiffre = cle;
    })
    .parse(process.argv);

if (program.dechiffre)
    console.log(dechiffrementVigenere(mot, motChiffre));
else
    console.log(chiffrementVigenere(mot, motChiffre));
