const crypto = require("crypto");

function pseudohash(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i) * 3 ** i;
        hash %= (2**16);
    }

    return hash;
}

function sha256(string){
    return crypto.createHash("sha256").update(string).digest("hex");
}

console.log(pseudohash(process.argv[2]).toString(16));
console.log(sha256(process.argv[2]));
