const crypto = require("crypto");
const base58 = require("base-58");

function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest();
}

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves;
        this.tree = [[]];

        for (const leaf of leaves) {
            this.tree[0].push(sha256(Buffer.from(leaf, "utf-8")));
        }

        let depth = 0;
        while (this.tree[depth].length > 1) {
            this.tree.push([]);
            for (let i = 0; i < this.tree[depth].length; i+=2) {
                let leaf1 = this.tree[depth][i];
                let leaf2;
                if (i + 1 < this.tree[depth].length) {
                    leaf2 = this.tree[depth][i + 1];
                } else {
                    leaf2 = Buffer.from([]);
                }
                let leavesHashBuffer = sha256(Buffer.concat([leaf1, leaf2]));
                this.tree[depth + 1].push(leavesHashBuffer);
            }
            depth++;
        }
    }

    preuve(string) {
        let index = this.leaves.indexOf(string);
        if (index !== -1) {
            let hashBuffer = this.tree[0][index];
            console.log(`Hash of ${string} : ${base58.encode(hashBuffer)}`);
            for (let depth = 0; depth < this.tree.length - 1; depth++) {
                let isLeafRight = index & 1;
                let indexOpposingLeaf = index ^ 1;
                let opposingHashBuffer = this.tree[depth][indexOpposingLeaf];
                let proofBuffer;
                if (isLeafRight) {
                    proofBuffer = sha256(Buffer.concat([opposingHashBuffer, hashBuffer]));
                    console.log(`Proof depth ${depth} : ${base58.encode(opposingHashBuffer)} + ${base58.encode(hashBuffer)} =  ${base58.encode(proofBuffer)}`);
                } else {
                    proofBuffer = sha256(Buffer.concat([hashBuffer, opposingHashBuffer]));
                    console.log(`Proof depth ${depth} : ${base58.encode(hashBuffer)} + ${base58.encode(opposingHashBuffer)} =  ${base58.encode(proofBuffer)}`);
                }
                hashBuffer = proofBuffer;
                index >>= 1;
            }
            console.log(`Final proof : ${base58.encode(hashBuffer)}`);
            console.log(`Root of Merkle tree : ${base58.encode(this.tree[this.tree.length - 1][0])}`);
        }
    }

    toString() {
        let strings = [];
        for (let depth = 0; depth < this.tree.length; depth++) {
            const hashes = this.tree[depth];
            let string = [];
            for (const hash of hashes) {
                string.push(base58.encode(hash));
            }
            strings.push(string.join(" "));
        }
        return strings.join("\n");
    }
}



let args = process.argv.slice(2)

if (args.length == 0) {
    console.log ("node merkle.js <string...>");
    process.exit(1);
}

merkle = new MerkleTree(args);

console.log(merkle.toString());
// merkle.preuve(args[0]);
