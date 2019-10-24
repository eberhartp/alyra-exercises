function oddProduct(n) {
    // Produit des impairs inférieurs ou égaux à n
    let result = 1n;
    for (let i = 3n; i <= n; i = i + 2n) {
        result *= i;
    }
    return result;
}

function factorial(n) {
    let result = 1n;
    let power = 0n;

    while (n > 1n) {
        result = result * oddProduct(n);
        // Partie entière de n/2
        n = n >> 1n;
        power = power + n;
    }

    result = result << power;

    return result;
}

for (let i = 0n; i < 20n; i = i + 1n) {
    console.log(`${i}! = ${factorial(i)}`);    
}
