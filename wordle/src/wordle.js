const WORDS = ["apple", "banana", "cherry", "grape", "orange"];
const MAX_GUESSES = 6;

let secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
let guessedWord = Array(secretWord.length).fill("_");
let remainingGuesses = MAX_GUESSES;

function displayWord() {
    console.log(guessedWord.join(" "));
}

function handleGuess(letter) {
    if (remainingGuesses <= 0) {
        console.log("The word was:" + secretWord);
        return;
    }

    if (secretWord.includes(letter)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        remainingGuesses--;
    }

    displayWord();
}

// Example usage:
handleGuess("a");
handleGuess("e");
