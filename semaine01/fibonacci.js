function fibonacci(n) {
    if (n <= 1)
        return 1;
    else
        return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciLoop(n) {
    let fibonacciArray = [];
    for (let i = 0; i < n; i++) {
        if (i < 2)
            fibonacciArray[i] = 1;
        else
            fibonacciArray[i] = fibonacciArray[i - 1] + fibonacciArray[i - 2];
    }
    return fibonacciArray;
}

for (let i = 0; i < 40; i++) {
    console.log("Recursive", i, ":", fibonacci(i));
}    

let array = fibonacciLoop(40);
for (let i = 0; i < array.length; i++) {
    console.log("Iterative", i, ":", array[i]);
}