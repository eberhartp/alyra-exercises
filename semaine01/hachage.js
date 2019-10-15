const crypto = require("crypto");

function pseudohash(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i) * 3 ** i;
        hash %= (2**16);
    }

    return hash;
}

console.log("Pseudohash", pseudohash(process.argv[2]).toString(16));

function sha256(dataBuffer) {
    return crypto.createHash("sha256").update(dataBuffer).digest();
}

function doubleHash(dataBuffer) {
    let hash = sha256(dataBuffer);
    return sha256(hash);
}

function key (dataBuffer) {
    return sha256(dataBuffer).subarray(0, 4);
}

function keyVerification (data, dataKey) {
    return key(Buffer.from(data)).toString("hex") === dataKey;
}

let dataBuffer = Buffer.from(process.argv[2]);
console.log("Double hash :", doubleHash(dataBuffer).toString("hex"));
console.log("Key :", key(dataBuffer).toString("hex"));
console.log("Verification :", "pomme", "9169bf3e", keyVerification("pomme", "9169bf3e"));

// Fonction qui donne une chaine dont le hash commence par "66"
