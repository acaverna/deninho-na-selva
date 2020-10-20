const deninho = document.querySelector(".deninho");
const php = document.querySelector(".php");
const speed = 50;

let x = 0;
let y = 0;
let flipped = false;
let rotate = 0;

const moves = ["arrowup", "arrowdown", "arrowleft", "arrowright"];

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

  // if its not an arrow key, we dont care
  switch (move) {
    case "arrowup":
      y = y - 1;
      rotate = -90;
      break;
    case "arrowdown":
      y = y + 1;
      rotate = 90;
      break;
    case "arrowleft":
      x = x - 1;
      rotate = 0;
      flipped = true;
      break;
    case "arrowright":
      x = x + 1;
      rotate = 0;
      flipped = false;
      break;
    default:
      console.log("that is not a valid move");
      break;
  }

  php.setAttribute(
    "style",
    `
        --rotatex: ${flipped ? "180deg" : "0"};
        --x: ${x * 35}px;
        --y: ${y * 35}px;
        --rotate: ${rotate}deg;
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

setInterval(movePHP, 1000);
setInterval(checkColission, 500);

function changeBackground() {
  images = [
    `url("${BASE_URL}/img/jungles/deninho-snake.jpg")`,
    `url("${BASE_URL}/img/jungles/Jungle-HD-Pictures.jpeg")`,
    `url("${BASE_URL}/img/jungles/selva-abyss.jpg")`,
  ];
  body = document.getElementsByTagName("body")[0];
  body.style.background = images[Math.floor(Math.random() * images.length)];
}