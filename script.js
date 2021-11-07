let order = [];
let clickedOrder = [];
let score = 0;
let highScore = localStorage.getItem("highscore");

// 0 = cyan
// 1 = yellow
// 2 = red
// 3 = green

// Create random color order
const cyan = document.querySelector(".cyan");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const starGame = document.querySelector(".new-game-button");
const gameOverButton = document.querySelector(".game-over-button");
const newGameModal = document.querySelector("#new-game");
const gameOverModal = document.querySelector("#game-over");
const unclickModal = document.querySelector("#unable-click");

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];
  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
  setTimeout(() => {
    hiddenModal(unclickModal);
  }, order.length * 500);
};

// Shine next color
let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  }, number);
};

// Check clicked buttons
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      return;
    }
  }
  if (clickedOrder.length == order.length) {
    score++;
    document.querySelector(".current-score").innerHTML = `score: ${score}`;
    nextLevel();
  }
};

// Function for player clicks
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 120);
};

// return color
let createColorElement = (color) => {
  if (color == 0) {
    return cyan;
  } else if (color == 1) {
    return yellow;
  } else if (color == 2) {
    return red;
  } else if (color == 3) {
    return green;
  }
};

// Next level function
let nextLevel = () => {
  showModal(unclickModal);
  setTimeout(() => {
    shuffleOrder();
  }, 500);
};

// Game Over function
let gameOver = () => {
  document.querySelector(".current-score").innerHTML = `score: 0`;
  verifyHighScore();
  order = [];
  clickedOrder = [];
  hiddenModal(newGameModal);
  showModal(gameOverModal);
};

// compare score and high score
let verifyHighScore = () => {
  if (score > highScore) {
    localStorage.setItem("highscore", score);
    highScore = localStorage.getItem("highscore");
  }
  document.querySelector(".high-score").innerHTML = `high score: ${highScore}`;
};

let hiddenModal = (modal) => {
  modal.classList.remove("visible-modal");
  modal.classList.add("hidden-modal");
};

let showModal = (modal) => {
  modal.classList.remove("hidden-modal");
  modal.classList.add("visible-modal");
};

// Start game
let playGame = () => {
  score = 0;
  nextLevel();
};

cyan.onclick = () => click(0);
yellow.onclick = () => click(1);
red.onclick = () => click(2);
green.onclick = () => click(3);

highScore == null ? (highScore = 0) : verifyHighScore();

starGame.onclick = () => {
  hiddenModal(newGameModal);
  playGame();
};

gameOverButton.onclick = () => {
  hiddenModal(gameOverModal);
  playGame();
};
