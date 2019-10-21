const crypto = require("crypto")

function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest();
}

function mining(block, target) {
    let nonce = 0n;
    let hexString = block.toString(16) + nonce.toString(16);
    let hash = BigInt("0x" + sha256(Buffer.from(hexString, "hex")).toString("hex"));

    while (target < hash) {
        nonce = nonce + 1n;
        hexString = block.toString(16) + nonce.toString(16);
        hash = BigInt("0x" + sha256(Buffer.from(hexString, "hex")).toString("hex"));
    }

    return nonce;
}

let target = 0x10000000000000000000000000000000000000000000000000000000000000n;

for (let block = 0n; block < 10n; block = block + 1n) {
    let nonce = mining(block, target);
    console.log(`Nonce of block ${block} for target ${target} : ${nonce}`);    
}
