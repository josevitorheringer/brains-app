let order = [];
let clickedOrder = [];
let score = 0;

// 0 = cyan
// 1 = yellow
// 2 = red
// 3 = green

// Create random color order
const cyan = document.querySelector(".cyan");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");
const green = document.querySelector(".green");

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
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
      break;
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
  shuffleOrder();
};

// Game Over function
let gameOver = () => {
  document.querySelector(".current-score").innerHTML = `score: 0`;
  alert(`Score: ${score}\n GAME OVER`);
  order = [];
  clickedOrder = [];

  playGame();
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

playGame();
