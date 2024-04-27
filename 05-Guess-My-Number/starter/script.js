"use strict";
//Game Mode
let gameMode = true;
const checkGameMode = function () {
  if (gameMode) {
    checkBtn.addEventListener("click", checkEvent);
  } else {
    checkBtn.removeEventListener("click", checkEvent);
  }
};

//Define The Main Variables
let illestratMsg = document.querySelector(".message");
let tryTimes = document.querySelector(".tryTimes");
let highScore = document.querySelector(".highscore");
let numberELement = document.querySelector(".number");

//Texts And Messages
const startGuessingMsg = "Start guessing...";
const tooHighMsg = "📉Too High...";
const tooLowMsg = "📈Too Low...";
const CorrectNumberMsg = "🎉 Correct Number";
const emptyNumberMsg = "⛔️ No number!";
const lostGameMsg = "💥 You lost the game!";
let fullTimesReset = 20;
tryTimes.textContent = fullTimesReset;
//Buttons And Inputs
const againBtn = document.querySelector(".btn.again");
const checkBtn = document.querySelector(".btn.check");
const guessInpt = document.querySelector(".guess");

//Todo Start Generating Number (Game Logic)

const generatedNumber = Math.trunc(Math.random() * 20) + 1;

//Todo Start First Step : Pressing The Check Btn

checkBtn.addEventListener("click", checkEvent);
function checkEvent() {
  const guessingNumber = Number(guessInpt.value);
  if (!guessInpt) {
    illestratMsg.textContent = emptyNumberMsg;
  } else if (guessingNumber === generatedNumber) {
    document.body.classList.add("correct");
    numberELement.textContent = `${guessingNumber}`;
    highScore.textContent = `${Number(
      +highScore.textContent + +tryTimes.textContent
    )}`;
    illestratMsg.textContent = CorrectNumberMsg;
    gameMode = false;
  } else if (guessingNumber > generatedNumber) {
    illestratMsg.textContent = tooHighMsg;
    tryTimes.textContent = `${--fullTimesReset}`;
  } else if (guessingNumber < generatedNumber) {
    illestratMsg.textContent = tooLowMsg;
    tryTimes.textContent = `${--fullTimesReset}`;
  }
  tryTimesCheck();
  checkGameMode();
}

//Todo Start Second Step If The Try Times === 0
function tryTimesCheck() {
  if (+tryTimes.textContent === 0) {
    illestratMsg.textContent = lostGameMsg;
    gameMode = false;
    tryTimes.textContent = 0;
    document.body.classList.add("lose");
  }
  checkGameMode();
}
//**Start Third Step [Again Or Restart]! The Game
function tryAgain() {
  if (+tryTimes.textContent === 0) {
    highScore.textContent = 0;
  }
  fullTimesReset = 20;
  tryTimes.textContent = fullTimesReset;
  document.body.classList.remove("correct", "lose");
  illestratMsg.textContent = startGuessingMsg;
  numberELement.textContent = "?";
  guessInpt.value = "";
  gameMode = true;
  checkGameMode();
}
againBtn.addEventListener("click", tryAgain);
