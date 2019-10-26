function frequences(texte) {
    let freqObj = {};
    for (const char of texte) {
        if (freqObj.hasOwnProperty(char))
            freqObj[char] += 1;
        else
            freqObj[char] = 1;
    }
    return freqObj;
}

console.log(frequences("Etre contesté, c’est être constaté"));
