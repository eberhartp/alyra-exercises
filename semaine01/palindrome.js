function palindromeLoop(word){
    for (let i = 0; i < Math.floor(word.length / 2); i++) {
        const element = word[i];
        if (element !== word[word.length - i - 1])
            return false;
    }
    return true;
}

function palindrome(word) {
    if (word.length <= 1)
        return true;
    if (word[0] === word[word.length - 1])
        return palindrome(word.substr(1, word.length - 2));
    return false;
}

function isPalindromeLoop(string) {
    console.log(string, palindromeLoop(string.split(" ").join("")) ? "is" : "is not", "a palindrome");
}
function isPalindrome(string) {
    console.log(string, palindrome(string.split(" ").join("")) ? "is" : "is not", "a palindrome");
}

isPalindromeLoop("BOB");
isPalindromeLoop("BOKB");
isPalindromeLoop("ANNA");
isPalindromeLoop("ESOPE RESTE ICI ET SE REPOSE");

isPalindrome("BOB");
isPalindrome("BOKB");
isPalindrome("ANNA");
isPalindrome("ESOPE RESTE ICI ET SE REPOSE");