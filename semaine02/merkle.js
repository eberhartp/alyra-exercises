const crypto = require ("crypto");

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
}

merkle = new MerkleTree(["AA", "BB", "CC", "DD", "EE"]);
console.log(merkle.leaves);
console.log(merkle.tree);