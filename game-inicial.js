const canvas = document.querySelector("#game");

const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
//hay que usar este evento resize, porque canvas no recarga la pagina automaticamente
window.addEventListener("resize", setCanvasSize);

//VARIABLES
let canvasSize;
let canvasElementsSize;

//para inicializar lo que se necesita al inicio del juego
function startGame() {
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  //font siver para modificar el estilo de la letra, funciona como un atributo no como un metodo EJ:  game.font = "25px sanserif";
  game.font = `${canvasElementsSize}px Verdana`;

  //textAlign: sirve para alinear el texto, dependiendo de las coordenadas especificadas con fillText, ej: textAlign = "start" se alinea iniciando desde las coordenadas del fillText en este caso 100,100
  game.textAlign = "end";

  //primer elemento del mapa de strings
  const map = maps[1];
  //para crear un arreglo cada vez que se encuentre un salto de lineaby limpiandolo con el trim
  const mapRows = map.trim().split("\n");
  //para crear un arreglo y separarlo por caracter para obtener los emojis que vamos a renderizar
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });
  console.log(canvasSize, canvasElementsSize);

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      //fillText:sirve para insertar texto, etc, hay que especificarle la posicion donde debe iniciar, nota: se le puede dar estilos como si fuera css con font, fillstyle, etc
      game.fillText(
        //renderizando el emoji, se le resta 1 a row y a col porque empezamos el for en 1
        emojis[mapRowCols[row - 1][col - 1]],
        canvasElementsSize * col,
        canvasElementsSize * row
      );
    }
  }
  //fillRect: define la posicion donde inicia(x, y) y termina (x, y) nuestro trazo, con cordenadas
  //game.fillRect(0, 0, 100, 100);
  //clearRect: sirve para borrar un rectangulo desde la posicion inicial (x, y) y termina (x, y)
  //game.clearRect(0, 0, 50, 50);

  //fillStyle: cambia el color
  //game.fillStyle = "red";
}

function setCanvasSize() {
  //window.innerWidth y window.innerHeight: para obtener el ancho de la ventana del dispositivo, mientras que window.innerHeight es para el largo de la ventana o pantalla
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  canvasElementsSize = canvasSize / 10;

  startGame();
}
