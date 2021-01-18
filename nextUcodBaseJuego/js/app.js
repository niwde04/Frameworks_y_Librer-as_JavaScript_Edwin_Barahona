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

  
    //---------------------

    var rows = 7;
    var cols = 7;
    var grid = [];
  
    for (var r = 0; r < rows; r++) {
        grid[r] = [];
        $(".panel-tablero").append('<div class= "row-'+r+'" ></>')

        for (var c = 0; c < cols; c++) {

            grid[r][c] = numRandom()

            $(".row-"+r+"").append('<div class="col-'+c+'"> <img src="image/' + grid[r][c] + '.png" class="candy" style="height:' + altoCelda + 'px; position: absolute"  id='+ grid[r][c] +' /></div>')
        }
    }

    console.log(grid)

    // ... Matrix declaration goes here

    function getCell(matrix, y, x) {
        var NO_VALUE = null;
        var value, hasValue;

        try {
            hasValue = matrix[y][x] !== undefined;
            value = hasValue ? matrix[y][x] : NO_VALUE;
        } catch (e) {
            value = NO_VALUE;
        }

        return value;
    }

    function surroundings(matrix, y, x) {
        // Directions are clockwise
        return {
            up: {
                value: getCell(matrix, y - 1, x),
                index: [y - 1 + "-" + x]
            },

            right: {
                value: getCell(matrix, y, x + 1),
                index: [y, x + 1]
            },

            down: {
                value: getCell(matrix, y + 1, x),
                index: [y + 1, x]

            },

            left: {
                value: getCell(matrix, y, x - 1),
                index: [y + "-" + x - 1]

            }
            // upRight:   getCell(matrix, y-1, x+1),
            //downRight: getCell(matrix, y+1, x+1),
            //downLeft:  getCell(matrix, y+1, x-1),
            //upLeft:    getCell(matrix, y-1, x-1)
        }
    }



    var adyacentes;


    /*  let up = (adyacentes.up)
      let right = (adyacentes.right)
      let down = (adyacentes.down)
      let left = (adyacentes.left)

     */

    // buscando combos.

    function combos(h) {
        let combo = [];

        for (let y = 0; y < rows; y++) {

            for (let x = 0; x < cols; x++) {

                adyacentes = (surroundings(grid, y, x))

                var up = adyacentes.up.value

                if (up == grid[y][x]) {

                    let pcombo = (y + "-" + x + "/" + adyacentes.up.index)
                    let nuevoAdyacente = adyacentes.up.index + ''
                    let adyacenteYX = nuevoAdyacente.split('-');

                    adyacentes = (surroundings(grid, adyacenteYX[0], adyacenteYX[1]))

                    if (up == adyacentes.up.value) {

                        combo.push(pcombo + "/" + adyacentes.up.index)
                       
                    }
                   
                }
                
            }
           
        }
        return combo;
    }


    let comboV = combos("up");
    let comboH = combos("left");

    console.log(comboV)
    //console.log(comboH)

 
var box = $(".candy");
var mainCanvas = $(".panel-tablero");


box.draggable({
    containment: mainCanvas,
    helper: "clone",

    start: function () {
       $(this).css({
            opacity: 0
        });

       $(".candy").css("z-index", "0");
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



})