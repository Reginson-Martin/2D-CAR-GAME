const score = document.querySelector(".score");

const startScreen = document.querySelector(".startScreen");

const gameArea = document.querySelector(".gameAreaHide");
let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

let player = { speed: 8 };

let road = gameArea.getBoundingClientRect();


startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function iscollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    (aRect.bottom < bRect.top) ||
    (aRect.top > bRect.bottom) ||
    (aRect.right < bRect.left) ||
    (aRect.left > bRect.right)
  )
}

function moveLines() {
  let lines = document.querySelectorAll(".line");
  lines.forEach(function (item) {
    if (item.y > 1500) {
      item.y -= 1500;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });

}

function moveEnemy(car) {
  let ele = document.querySelectorAll(".enemy");
  ele.forEach(function (item) {
    if (iscollide(car, item)) {
      endGame();

    }

    if (item.y > 1500) {
      item.y = -600;
      item.style.left = Math.floor(Math.random() * 330) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });

}

function renderPowerUp() {
  const powerUpTimeArr = [2000, 4300];
  if (powerUpTimeArr.includes(player.score)) {
    const powerUp = document.createElement('div');
    powerUp.classList.add('power');
    powerUp.style.top = '150px';
    powerUp.y = '150px';
    gameArea.appendChild(powerUp);
  }
}

function checkPowerUp(car, powerUp) {
  if(powerUp) {
  const hasCollided = iscollide(car, powerUp);
  if (hasCollided) {
    player.speed = 12;
    powerUp.style.display = "none";
  }
}
}

function playGame() {

  let car = document.querySelector(".car");
  moveLines();
  moveEnemy(car);
  renderPowerUp();
  checkPowerUp(car, document.querySelector('.power'));

  if (player.start) {

    if (keys.ArrowUp && player.y > (road.top - 750)) { player.y -= player.speed; }

    if (keys.ArrowDown && player.y < (road.bottom - 85)) { player.y += player.speed; }

    if (keys.ArrowLeft && player.x > -25) { player.x -= player.speed; }

    if (keys.ArrowRight && player.x < (road.width - 155)) { player.x += player.speed; }

    car.style.left = player.x + "px";
    car.style.top = player.y + "px";

    window.requestAnimationFrame(playGame);

    player.score++;
    score.innerText = `SCORE : ${player.score}`;
  }
}

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;

}

function pressOff(a) {
  a.preventDefault();
  keys[a.key] = false;
}

function endGame() {
  player.start = false;
  score.innerHTML = "Game Over<br> Score :" + player.score;
  startScreen.classList.remove("hide");
}

function start() {
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;
  for (i = 0; i < 5; i++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.y = i * 300;
    div.style.top = (i * 300) + "px";
    gameArea.appendChild(div);
  }
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  for (i = 0; i < 3; i++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = ((i + 1) * 600) * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 150) + "px";
    enemy.style.backgroundColor = "red";
    gameArea.appendChild(enemy);
  }

}

