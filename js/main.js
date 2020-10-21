function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const deninho = document.querySelector(".deninho");
const php = document.querySelector(".php");

const moves = ["arrowup", "arrowdown", "arrowleft", "arrowright"];
var totalRam = 0;

const speed = 50;

let x = 0;
let y = 0;
let flipped = false;
let rotate = 0;

function handleKeyDown(event) {
  // if its not an arrow key, we dont care
  if (!event.key.includes("Arrow")) {
    return;
  }
  switch (event.key) {
    case "ArrowUp":
      y = y - 1;
      rotate = -90;
      break;
    case "ArrowDown":
      y = y + 1;
      rotate = 90;
      break;
    case "ArrowLeft":
      x = x - 1;
      rotate = 0;
      flipped = true;
      break;
    case "ArrowRight":
      x = x + 1;
      rotate = 0;
      flipped = false;
      break;
    default:
      console.log("That is not a valid move");
      break;
  }

  deninho.setAttribute(
    "style",
    `
        --rotateX: ${flipped ? "180deg" : "0"};
        --x: ${x * speed}px;
        --y: ${y * speed}px;
        --rotate: ${rotate}deg;
      `
  );
}

window.addEventListener("keydown", handleKeyDown);
window.onload = changeBackground();

function movePHP() {
  let move = moves[Math.floor(Math.random() * moves.length)];

  let xPHP = x;
  let yPHP = y;
  const speedPHP = 25;
  let flippedPHP = flipped;
  let rotatePHP = rotate;

  // if its not an arrow key, we dont care
  switch (move) {
    case "arrowup":
      yPHP = yPHP - 1;
      rotatePHP = -90;
      break;
    case "arrowdown":
      yPHP = yPHP + 1;
      rotatePHP = 90;
      break;
    case "arrowleft":
      xPHP = xPHP - 1;
      rotatePHP = 0;
      flippedPHP = true;
      break;
    case "arrowright":
      xPHP = xPHP + 1;
      rotatePHP = 0;
      flippedPHP = false;
      break;
    default:
      console.log("that is not a valid move");
      break;
  }

  php.setAttribute(
    "style",
    `
        --rotatex: ${flippedPHP ? "180deg" : "0"};
        --x: ${xPHP * speedPHP}px;
        --y: ${yPHP * speedPHP}px;
        --rotate: ${rotatePHP}deg;
      `
  );
}

function checkColission() {
  let phpPos = php.getBoundingClientRect();
  let DeninhoPos = deninho.getBoundingClientRect();

  if (
    phpPos.x < DeninhoPos.x + DeninhoPos.width &&
    phpPos.x + phpPos.width > DeninhoPos.x &&
    phpPos.y < DeninhoPos.y + DeninhoPos.height &&
    phpPos.y + phpPos.height > DeninhoPos.y
  ) {
    alert("O PHP Pegou você!");
    location.reload();
  }
}

function generatePoint() {
  let x = randomIntFromInterval(-200, 500);
  let y = randomIntFromInterval(-250, 300);

  let ram = document.createElement("img");
  ram.src = "../img/ram.png";
  ram.className = "item ram";
  totalRam++;

  ram.style = `--x: ${x}px;
     --y: ${y}px`;

  document.getElementsByTagName("body")[0].appendChild(ram);
}

function checkPoint() {
  let points = document.getElementsByClassName("ram");
  let counter = document.querySelector(".counterNumber");

  for (i = 0; i < points.length; i++) {
    let ram = points[i];

    let ramPos = ram.getBoundingClientRect();
    let DeninhoPos = deninho.getBoundingClientRect();

    if (
      ramPos.x < DeninhoPos.x + DeninhoPos.width &&
      ramPos.x + ramPos.width > DeninhoPos.x &&
      ramPos.y < DeninhoPos.y + DeninhoPos.height &&
      ramPos.y + ramPos.height > DeninhoPos.y
    ) {
      ram.remove();
      totalRam++;
      counter.innerHTML = totalRam;
    }
  }
}
setInterval(movePHP, 1000);
setInterval(checkColission, 500);
setInterval(generatePoint, 5000);
setInterval(checkPoint, 200);

function changeBackground() {
  images = [
    "url('../img/jungles/deninho-snake.jpg')",
    "url('../img/jungles/Jungle-HD-Pictures.jpeg')",
    "url('../img/jungles/selva-abyss.jpg')",
  ];
  body = document.getElementsByTagName("body")[0];
  body.style.background = images[Math.floor(Math.random() * images.length)];
}
