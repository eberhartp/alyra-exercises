const hexTranslateString = "0123456789abcdef";

function numToString(num, translateString) {
    let string = "";
    let base = translateString.length;

    while (num > 0) {
        let remain = num % base;
        string = translateString.charAt(remain) + string;
        num = (num - remain) / base;
    }

    if (string === "")
        string = "0";

    return string;
}

function hexChangeEndianness(hexString) {
    return hexString.match(/.{1,2}/g).reverse().join("");
}

function numToVarInt(number) {
    let hexString = numToString(number, hexTranslateString);

    if (hexString.length % 2 == 1) {
        hexString = "0" + hexString;
    }

    if (number < 0xfd)
        return hexString;
    if (number < 0x10000) {
        hexString = hexString.padStart(4, "0");
        return "fd" + hexChangeEndianness(hexString);
    }
    if (number < 0x100000000) {
        hexString = hexString.padStart(8, "0");
        return "fe" + hexChangeEndianness(hexString);
    }
    hexString = hexString.padStart(16, "0");
    return "ff" + hexChangeEndianness(hexString);
}

function conversion(number) {
    let hexString = numToString(number, hexTranslateString);

    if (hexString.length % 2 == 1) {
        hexString = "0" + hexString;
    }

    let hexStringLE = hexChangeEndianness(hexString);

    let varIntString = numToVarInt(number);

    console.log(`${number} => 0x${hexString} (big endian)`);
    console.log(`${number} => 0x${hexStringLE} (little endian)`);
    console.log(`${number} => 0x${varIntString} (little endian)`);
}

conversion(0xF01);
