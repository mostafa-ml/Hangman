let lettersContainer = document.querySelector(".letters");

[...'abcdefghijklmnopqrstuvwxyz'].forEach(letter => {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(letter));
    span.setAttribute("class", "letter-box");
    lettersContainer.appendChild(span);
});

// Object of word & categories
const words = {
    programming: ["php", "javascript", "go", "scala", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// Get random key & its value
let randomNumber = Math.floor(Math.random() * Object.keys(words).length);
let randomKey = Object.keys(words)[randomNumber];
let randomKeyValues = words[randomKey];
let randomKeyValue = randomKeyValues[Math.floor(Math.random() * randomKeyValues.length)];

document.querySelector(".game-info .category span").innerHTML = randomKey;

// Generate guess letters
let lettersGuess = document.querySelector(".letters-guess");

[...randomKeyValue].forEach(letter => {
    let span = document.createElement("span");
    lettersGuess.appendChild(span);
    if (letter === ' ') {
        span.setAttribute("class", "space");
    }
})

// Handle clicking on letter
let lettersGuessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
let counter = 0;

document.addEventListener("click", e => {
    let status = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        // Loop on the chosen word
        [...randomKeyValue.toLowerCase()].forEach((wordLetter, index) => {
            // if the clicked letter = the chosen word's letter
            if (e.target.innerHTML.toLowerCase() === wordLetter) {
                lettersGuessSpans[index].innerHTML = wordLetter;
                status = true;
                counter++;
                if (counter === [...randomKeyValue].length) {
                    endGame(`Finished! You're a ${wrongAttempts < 2? 'professional': wrongAttempts < 5? 'good': 'lucky'} player, You guessed wrong ${wrongAttempts} times`);
                    document.getElementById("final-success").play();
                } else {
                    document.getElementById("success").play();
                }
            }
        })

        if (!status) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts === 8) {
                endGame(`Game Over, the word is '${randomKeyValue}'`);
                document.getElementById("final-fail").play();
                lettersContainer.classList.add("finished");
            } else {
                document.getElementById("fail").play();
            }
        }
    }
});

// End Game function
function endGame(txt) {
    let blur = document.createElement("div");
    blur.classList.add("blur");
    document.body.appendChild(blur);

    let div = document.createElement("div");
    div.appendChild(document.createTextNode(txt));
    div.classList.add("popup");
    document.body.appendChild(div);
}