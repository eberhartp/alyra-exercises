const rates = {
    Doge : {
        LTC : 32/84,
        ETH : 80/29
    },
    ETH : {
        BTC : 62/300
    },
    LTC : {
        ETH : 2304/288
    },
    BTC : {
        Doge : 46/27,
        LTC : 16/33
    }
}

function currencyLoop(currencyArray, currencyAmount = 1) {
    // currencyArray : tableau de changement de monnaie
    // la monnaie initiale est currencyArray[0],
    // currencyArray[1] est la première monnaie changée, etc...
    // currencyAmount : taux combiné pour les changement de 
    // monnaie contenus dans currencyArray
    // la valeur par défaut est de 1 pour l'appel initial
    let currentCurrency = currencyArray[currencyArray.length - 1];
    if (currencyArray.length > 1 &&  currentCurrency === currencyArray[0]) {
        if (currencyAmount > 1)
            console.log(`${currencyArray.join(" => ")} : ${currencyAmount}`);
    } else {
        for (const currency in rates[currentCurrency]) {
            const rate = rates[currentCurrency][currency];
            if (!currencyArray.slice(1).includes(currency)) {
                // Pour éviter les boucles infinies on ne passe qu'une seule fois
                // par chaque monnaie (sauf la monnaie initiale)
                let newCurrencyArray = currencyArray.slice();
                newCurrencyArray.push(currency);
                currencyLoop(newCurrencyArray, currencyAmount * rate);
            }
        }
    }
}

for (const currency in rates) {
    currencyLoop([currency]);
}