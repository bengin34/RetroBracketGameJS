const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const startButton = document.querySelector(".btn");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const userStart = [230, 10];
let currentPosition = userStart;
const ballStart = [270, 30];
let ballCurrentPosition = ballStart;
let timerId;
let ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;
let score = 0;
let gameStarted = false;

//create block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}
// all my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// draw my block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

//add user
const user = document.createElement("div");
user.classList.add("user");

//draw user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
  grid.appendChild(user);
}

//draw the ball
function drawBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
  grid.appendChild(ball);
}

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentposition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

//move the ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

// check for collisions
function checkForCollisions() {
  //check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = document.querySelectorAll(".block");
      allBlocks[i].classList.remove("block");
      score++;
      scoreDisplay.innerHTML = score;
      yDirection = -yDirection;
    }
  }

  //check for side collisions
  if (
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[0] + ballDiameter >= boardWidth
  ) {
    xDirection = -xDirection;
  }
  if (ballCurrentPosition[1] <= 0) {
    yDirection = -yDirection;
  }
}

startButton.addEventListener("click", startGame);

function startGame() {
  if (!gameStarted) {
    addBlocks();
    drawUser();
    if (document.getElementsByClassName("ball").length === 0) {
      drawBall();
      document.addEventListener("keydown", moveUser);
      scoreDisplay.innerHTML = score;
      clearInterval(timerId);
      timerId = setInterval(moveBall, 12);
      gameStarted = true;
    }
  }
}
