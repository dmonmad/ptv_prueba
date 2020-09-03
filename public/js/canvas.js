// console.log("XD");

let miCanvas;
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;

let posicion;
correccionX;
correccionY;
let ctx;

canvasWidth = 500;
canvasHeight = 300


//======================================================================
// FUNCIONES
//======================================================================
$(document).ready(
    function () {

        miCanvas = document.querySelector('#pizarra');
        posicion = miCanvas.getBoundingClientRect();
        correccionX = posicion.x;
        correccionY = posicion.y;

        miCanvas.width = canvasWidth;
        miCanvas.height = canvasHeight;


        loadEvents();
    }
);



/**
 * Funcion que empieza a dibujar la linea
 */
function empezarDibujo() {
    pintarLinea = true;
    lineas.push([]);
};

/**
 * Funcion dibuja la linea
 */
function dibujarLinea(event) {
    event.preventDefault();
    if (pintarLinea) {
        ctx = miCanvas.getContext('2d')
        // Estilos de linea
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        // Color de la linea
        ctx.strokeStyle = '#000';
        // Marca el nuevo punto
        let nuevaPosicionX = 0;
        let nuevaPosicionY = 0;
        if (event.changedTouches == undefined) {
            // Versión ratón
            nuevaPosicionX = event.layerX;
            nuevaPosicionY = event.layerY;
        } else {
            // Versión touch, pantalla tactil
            nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
            nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
        }
        // Guarda la linea
        lineas[lineas.length - 1].push({
            x: nuevaPosicionX,
            y: nuevaPosicionY
        });
        // Redibuja todas las lineas guardadas
        ctx.beginPath();
        lineas.forEach(function (segmento) {
            ctx.moveTo(segmento[0].x, segmento[0].y);
            segmento.forEach(function (punto, index) {
                ctx.lineTo(punto.x, punto.y);
            });
        });
        ctx.stroke();
    }
}

/**
 * Funcion que deja de dibujar la linea
 */
function pararDibujar() {
    pintarLinea = false;
}

function clearCanvas_simple() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

//======================================================================
// EVENTOS
//======================================================================

function loadEvents() {

    // Eventos raton
    miCanvas.addEventListener('mousedown', empezarDibujo, false);
    miCanvas.addEventListener('mousemove', dibujarLinea, false);
    miCanvas.addEventListener('mouseup', pararDibujar, false);

    // Eventos pantallas táctiles
    miCanvas.addEventListener('touchstart', empezarDibujo, false);
    miCanvas.addEventListener('touchmove', dibujarLinea, false);
    $('#clearCanvasSimple').mousedown(function (e) {
        lineas = [];
        clearCanvas_simple();
    });
}

// canvasWidth = 500;
// canvasHeight = 300;
// var canvasDiv;
// var canvas;
// var context;
// var canvas;

// var clickX = new Array();
// var clickY = new Array();
// var clickDrag = new Array();
// var paint;

// $(document).ready(
//     function () {
//         canvasDiv = document.getElementById('canvasDiv');

//         console.log(document.ready);
//         console.log(document.readyState);
//         canvas = document.createElement('canvas');
//         canvas.setAttribute('width', canvasWidth);
//         canvas.setAttribute('height', canvasHeight);
//         canvas.setAttribute('id', 'canvas');
//         canvasDiv.appendChild(canvas);
//         if (typeof G_vmlCanvasManager != 'undefined') {
//             canvas = G_vmlCanvasManager.initElement(canvas);
//         }
//         context = canvas.getContext("2d");

//         loadEvents();
//     }
// );

// function loadEvents(){
//     $('#canvas').mousedown(function (e) {
//         var mouseX = e.pageX - this.offsetLeft;
//         var mouseY = e.pageY - this.offsetTop;

//         paint = true;
//         addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//         redraw();
//     });

//     $('#canvas').mousemove(function (e) {
//         if (paint) {
//             addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
//             redraw();
//         }
//     });

//     $('#canvas').mouseup(function (e) {
//         paint = false;
//     });

//     $('#canvas').mouseleave(function (e) {
//         paint = false;
//     });

//     $('#clearCanvasSimple').mousedown(function (e) {
//         clickX = new Array();
//         clickY = new Array();
//         clickDrag = new Array();
//         clearCanvas_simple();
//     });
// }



// function addClick(x, y, dragging) {
//     clickX.push(x);
//     clickY.push(y);
//     clickDrag.push(dragging);
// }

// function redraw() {
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

//     context.strokeStyle = "#000000";
//     context.lineJoin = "round";
//     context.lineWidth = 2;

//     for (var i = 0; i < clickX.length; i++) {
//         context.beginPath();
//         if (clickDrag[i] && i) {
//             context.moveTo(clickX[i - 1], clickY[i - 1]);
//         } else {
//             context.moveTo(clickX[i] - 1, clickY[i]);
//         }
//         context.lineTo(clickX[i], clickY[i]);
//         context.closePath();
//         context.stroke();
//     }
// }


// function clearCanvas_simple() {
//     context.clearRect(0, 0, canvasWidth, canvasHeight);
// }