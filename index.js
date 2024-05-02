let randomNumber = parseInt(Math.random() * 100 + 1);

const submitBtn = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const loworHi = document.querySelector(".lowOrHigh");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let attempts = 0;

let playGame = true;

if (playGame) {
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  // validate if guess is b/w 1 to 100
  if (isNaN(guess)) {
    alert("Please Enter A Valid Number");
  } else if (guess < 1) {
    alert("Please Enter A Number More Than 1");
  } else if (guess > 100) {
    alert("Please Enter A Number Less Than 100");
  } else {
    prevGuess.push(guess);
    if (attempts > 10) {
      DisplayGuess(guess);
      displayMessage(`Game Over! Random Number Was ${randomNumber}`);
      endGame();
    } else {
      DisplayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  // if value === randomNumber
  //message ? you win : low or high
  if (guess === randomNumber) {
    displayMessage(`You guessed it RIGHT!`);
    endGame();
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOOO High!`);
  } else {
    displayMessage(`Number is TOOO Low`);
  }
}

function DisplayGuess(guess) {
  // empty user input
  // add last guess to array
  // decrease the attempts
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  attempts++;
  remaining.innerHTML = `${10 - attempts}`;
  if (attempts > 10) {
    remaining.innerHTML = `NONE`;
  }
}

function displayMessage(message) {
  loworHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    attempts = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - attempts}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);

    playGame = true;
  });
}
