let transactionsSizes = [
    2000,
    6000,
    800,
    700,
    1200,
    1000,
    1300,
    600
];

let transactionsTips = [
    13000,
    9000,
    2000,
    1500,
    3500,
    2800,
    5000,
    1500
];

let maxBlockSize = 6000;

function getBlockBitmap(tryNumber) {
    // Fonction qui renvoie un tableau de booleens correspondant aux
    // transactions à inclure pour un essai de bloc donné
    let blockBitmap = [false, false, false, false, false, false, false, false];
    for (let i = 0; i < blockBitmap.length; i++) {
        blockBitmap[i] = tryNumber & 0x1;
        tryNumber = tryNumber >> 1;
    }
    return blockBitmap;
}

function getBlockSize(blockBitmap) {
    // Fonction qui renvoie la taille totale d'un bloc correspondant à des
    // transactions données
    // Renvoie maxBlockSize + 1 dès que le total dépasse maxBlockSize
    let totalSize = 0;
    for (let i = 0; i < blockBitmap.length; i++) {
        if (blockBitmap[i])
            totalSize += transactionsSizes[i];
        if (totalSize > maxBlockSize)
            return maxBlockSize + 1;
    }
    return totalSize;
}

function getBlockTips(blockBitmap) {
    // Fonction qui renvoie le total des pourboirs d'un bloc correspondant à
    // des transactions données
    let totalTips = 0;
    for (let i = 0; i < blockBitmap.length; i++) {
        if (blockBitmap[i])
            totalTips += transactionsTips[i];
    }
    return totalTips;
}

let bestBlockBitmap = getBlockBitmap(0);
let bestTotalTips = 0;

for (let i = 1; i < Math.pow(2, transactionsSizes.length); i++) {
    let blockBitmap = getBlockBitmap(i);
    if (getBlockSize(blockBitmap) < maxBlockSize) {
        let totalTips = getBlockTips(blockBitmap);
        if (totalTips > bestTotalTips) {
            bestBlockBitmap = blockBitmap;
            bestTotalTips = totalTips;
        }
    }
}

let blockTransactions = [];
for (let i = 0; i < bestBlockBitmap.length; i++) {
    if (bestBlockBitmap[i])
        blockTransactions.push(i);
}

console.log(`Transactions à inclure : ${blockTransactions}`);
console.log(`Pourboire : ${bestTotalTips}`);
