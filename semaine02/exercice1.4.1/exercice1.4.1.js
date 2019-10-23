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

function conversion(decNumber) {
    let hexString = numToString(decNumber, hexTranslateString);

    if (hexString.length % 2 == 1) {
        hexString = "0" + hexString;
    }

    console.log(`${decNumber} => 0x ${hexString.match(/.{1,2}/g).join(" ")} (big endian)`);
    console.log(`${decNumber} => 0x ${hexString.match(/.{1,2}/g).reverse().join(" ")} (little endian)`);
}

conversion(466321);