const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#btn-up");
const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
const btnDown = document.querySelector("#btn-down");

//VARIABLES
let canvasSize;
let elementsSize;
let level = 0;
let enemyPositions = [];

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  //para validar que ya se completaron todos los niveles
  if (!map) {
    gameWin();
    return;
  }

  const mapRows = map.trim().split("\n");
  //MAP: para crear un array apartir de un array
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  //console.log({ map, mapRows, mapRowCols });
  //console.log({ canvasSize, elementsSize });

  //limpiando el array y el canvas
  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  //forEach: para recorrer el arreglo
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      //se suma 1 para que el indice empiece en 1
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      //la posicion inicial del jugador es donde se encuentra la puerta, en este caso la puerta se representa con el emoji que tiene como valor el caracter O
      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    console.log("Chocaste contra un enemigo :(");
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
function levelWin() {
  console.log("Subiste de nivel");
  level++;
  startGame();
}
function gameWin() {
  console.log("¡Terminaste el juego!");
}

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
function moveUp() {
  //si la resta  es menor que el tamano del elemento (no puede ser < 0, porque el text align es end) nos saca del mapa, es decir no debo seguir moviendome, si es lo contrario puedo seguir moviendome
  if (playerPosition.y - elementsSize < elementsSize) {
    console.log("OUT");
  } else {
    console.log("Me quiero mover hacia arriba");
    playerPosition.y -= elementsSize;
    //startGame:para borrar todo y renderizar el jugador de nuevo
    startGame();
  }
}
function moveLeft() {
  if (playerPosition.x - elementsSize < elementsSize) {
    console.log("OUT");
  } else {
    console.log("Me quiero mover hacia izquierda");
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  //si la suma  es mayor que el tamano del canvas (no puede ser > 0, porque el text align es end) nos saca del mapa, es decir no debo seguir moviendome, si es lo contrario puedo seguir moviendome
  if (playerPosition.x + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    console.log("Me quiero mover hacia derecha");
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log("Me quiero mover hacia abajo");

  if (playerPosition.y + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}

//EVENTS
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);
