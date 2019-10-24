const crypto = require("crypto");

const ips = [
    "153.8.223.72",
    "169.38.84.49",
    "169.46.49.112",
    "184.173.213.155",
    "159.122.100.41",
    "119.81.134.212",
    "5.10.5.200",
    "158.176.81.249",
    "168.1.168.251",
    "169.57.7.230",
    "159.122.142.111",
    "159.8.78.42",
    "192.155.217.197",
    "169.57.163.228",
    "169.56.184.72",
    "50.87.60.166"
];

const locations = [
    "Amsterdam",
    "Chennai",
    "Dallas",
    "Dallas, TX, USA",
    "Frankfurt",
    "Hong Kong",
    "London",
    "London",
    "Melbourne",
    "Mexico City",
    "Milan",
    "Paris",
    "San Jose",
    "São Paulo",
    "Toronto",
    "Washington DC"
];

class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return `{${this.key} : ${this.value}}`;
    }
}

class HashTable {
    constructor() {
        this.table = new Array([],[],[],[],[],[],[],[]);
    }

    add(key, value) {
        let index = crypto.createHash("md5").update(key).digest()[0] % 8;
        this.table[index].push(new KeyValuePair(key, value));
    }

    get(key) {
        let index = crypto.createHash("md5").update(key).digest()[0] % 8;
        for (const pair of this.table[index]) {
            if (pair.key === key)
                return pair.value;
        }
    }

    toString() {
        let strings = [];
        for (let i = 0; i < this.table.length; i++) {
            const hashes = this.table[i];
            let hashStrings = [];
            for (const pair of hashes)
                hashStrings.push(pair.toString());
            strings.push(`${i} => ${hashStrings.join(", ")}`);
        }
        return strings.join("\n");
    }
}

let table = new HashTable();

for (let i = 0; i < ips.length; i++) {
    const ip = ips[i];
    const location = locations[i];
    table.add(ip, location);
}

console.log(table.toString());
console.log(table.get("169.56.184.72"));