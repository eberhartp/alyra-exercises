function chiffreCesar(mot, chiffre) {
    let cypheredText = "";
    
    for (let i = 0; i < mot.length; i++) {
        let charCode = mot.charCodeAt(i);

        if (0x40 < charCode && charCode < 0x5B)
            charCode = (charCode - 0x41 + chiffre) % 26 + 0x41;
        if (0x60 < charCode && charCode < 0x7B)
            charCode = (charCode - 0x61 + chiffre) % 26 + 0x61;

        cypheredText += String.fromCharCode(charCode);
    }
    
    return cypheredText;
}

console.log(chiffreCesar("IBM", 25));
console.log(chiffreCesar("abc", 1));
