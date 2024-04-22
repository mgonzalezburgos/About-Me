let snake = [];
let direction = 0; // 0: up, 1: right, 2: down, 3: left
const scl = 20; // size of each pixel
let speed = 5; // slower speed
let minX, minY, maxX, maxY; // boundaries for rectangular movement (smaller space)
let food; // food position
let colors; // array of segment colors

function setup() {
  createCanvas(600, 600);
  snake.push(createVector(width / 2, height / 2)); // Start snake in center
  minX = scl * 3;
  minY = scl * 3;
  maxX = width - scl * 3;
  maxY = height - scl * 3;
  spawnFood(); // Initialize food position
  colors = [color(255), color(0), color(255, 255, 0), color(255, 192, 203), color(255, 0, 0), color(255, 192, 203)];
}

function draw() {
  background("#97e7f5"); // Soft cyan background

  // Update the snake's position based on direction
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }

  // Move snake head
  switch (direction) {
    case 0:
      snake[0].y -= scl;
      break;
    case 1:
      snake[0].x += scl;
      break;
    case 2:
      snake[0].y += scl;
      break;
    case 3:
      snake[0].x -= scl;
      break;
  }

  // Check for collision with boundaries
  if (snake[0].x < minX || snake[0].x >= maxX || snake[0].y < minY || snake[0].y >= maxY) {
    gameOver();
  }

  // Check for collision with snake body
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Check for collision with food
  if (dist(snake[0].x, snake[0].y, food.x, food.y) < 1) {
    snake.push(createVector(snake[snake.length - 1].x, snake[snake.length - 1].y));
    spawnFood();
  }

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    fill(colors[i % colors.length]); // Repeat colors as snake grows
    rect(snake[i].x, snake[i].y, scl, scl);
  }

  // Draw food
  fill(0, 255, 0); // green for food
  rect(food.x, food.y, scl, scl);

  frameRate(speed); // set frameRate to adjust animation speed
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if (direction !== 2) direction = 0;
      break;
    case RIGHT_ARROW:
      if (direction !== 3) direction = 1;
      break;
    case DOWN_ARROW:
      if (direction !== 0) direction = 2;
      break;
    case LEFT_ARROW:
      if (direction !== 1) direction = 3;
      break;
  }
}

function spawnFood() {
  let validX, validY;
  do {
    const cols = floor((maxX - minX) / scl);
    const rows = floor((maxY - minY) / scl);
    validX = floor(random(cols)) * scl + minX;
    validY = floor(random(rows)) * scl + minY;
  } while (snake.some(segment => segment.x === validX && segment.y === validY));

  food = createVector(validX, validY);
}

function gameOver() {
  noLoop();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}
