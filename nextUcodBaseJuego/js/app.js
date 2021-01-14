function colorTituloBlanco() {

    $(".main-titulo").animate({
        color: "white"
    }, "slow", function () {
        colorTituloAmarillo();
    })
}

function colorTituloAmarillo() {

    $(".main-titulo").animate({
        color: "yellow"
    }, "slow", function () {
        colorTituloBlanco();
    })
}

colorTituloBlanco()

//funcion numero aleatorio
function numRandom() {
    var dulce = 0
    dulce = Math.floor(Math.random() * (4) + 1);

    return dulce;
}

// tamaño tablero
var ancho = $('.panel-tablero').width();
var alto = $('.panel-tablero').height();
var altoCelda = alto / 7;

//llenar tablero con dulces random

$(document).ready(function () {

    for (var r = 0; r <= 7; r++) {

        for (var c = 0; c <= 6; c++) {
            $(".col-" + r).append('<img src="image/' + numRandom() + '.png" class="candy" style="height:' + altoCelda + 'px" id=c' + r + '' + c + ' /> ');
        }

    }

//---------------------

var rows=7; 
var cols = 7; 
var grid = []; 
var validFigures=0;
var score = 0;
var moves = 0;


    for (var r = 0; r < rows; r++) {
        grid[r]=[];
        for (var c =0; c< cols; c++) {
           grid[r][c]= numRandom()
        }
       }

       console.log(grid)

       // ... Matrix declaration goes here

function getCell(matrix, y, x) {
    var NO_VALUE = null;
    var value, hasValue;
    
    try {
      hasValue = matrix[y][x] !== undefined;
      value    = hasValue?  matrix[y][x] : NO_VALUE;
    } catch(e) {
      value    = NO_VALUE;
    }
  
    return value;
  }

  function surroundings(matrix, y, x) {
    // Directions are clockwise
    return {
      up:        getCell(matrix, y-1, x),
      upRight:   getCell(matrix, y-1, x+1),
      right:     getCell(matrix, y,   x+1),
      downRight: getCell(matrix, y+1, x+1),
      down:      getCell(matrix, y+1, x),
      downLeft:  getCell(matrix, y+1, x-1),
      left:      getCell(matrix, y,   x-1),
      upLeft:    getCell(matrix, y-1, x-1)
    }
  }




let adyacentes = (surroundings(grid,0,0))

console.log(adyacentes.down)

 /*
var box = $(".candy");
var mainCanvas = $(".panel-tablero");


box.draggable({
    containment: mainCanvas,
    helper: "clone",

    start: function () {
       $(this).css({
            opacity: 0
        });

     //  $(".box").css("z-index", "0");
    },

    stop: function () {
        $(this).css({
            opacity: 3
        });
    }
});

box.droppable({
    accept: box,

    drop: function (event, ui) {
        var draggable = ui.draggable;
        var droppable = $(this);
        var dragPos = draggable.position();
        var dropPos = droppable.position();

        draggable.css({
            left: dropPos.left + "px",
            top: dropPos.top + "px",
            "z-index": 20
        });

        droppable.css("z-index", 10).animate({
            left: dragPos.left,
            top: dragPos.top
        });
    }
});


*/
})