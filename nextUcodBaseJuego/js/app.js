function colorTituloBlanco() {

    $(".main-titulo, .titulo-over").animate({
        color: "white"
    }, "slow", function () {
        colorTituloAmarillo();
    })
}

function colorTituloAmarillo() {

    $(".main-titulo, .titulo-over").animate({
        color: "yellow"
    }, "slow", function () {
        colorTituloBlanco();
    })
}

colorTituloBlanco()


function destruirCombo(y, x) {
    $("#" + y + "-" + x + "").toggle("pulsate",500)
}

function quitarDuplicados(arreglo) {

    let result = arreglo.filter((item, index) => {

        return arreglo.indexOf(item) === index;
    })

    return result
}



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



$(document).ready(function () {

    //---------------------
    var rows = 7;
    var cols = 7;
    var grid = [];
    var score = 0;
    var moves = 0;
    var flagInicio = 1;

    //llenar tablero con dulces random

    function llenarTablero() {

        for (var r = 0; r < rows; r++) {
            grid[r] = [];
            $(".panel-tablero").append('<div class= "row-' + r + '" ></>')

            for (var c = 0; c < cols; c++) {

                grid[r][c] = numRandom()

                $(".row-" + r + "").append('<div class="col-' + c + '" id="d' + r + '-' + c + '"> <img src="image/' + grid[r][c] + '.png" class="candy" style="height:' + altoCelda + 'px; position: absolute"  id=' + r + '-' + c + '></div>')

            }
        }

        console.log(grid)
    }

    function llenarTableroJuegoIniciado() {

        for (var r = 0; r < rows; r++) {

            $(".panel-tablero").append('<div class= "row-' + r + '" ></>')

            for (var c = 0; c < cols; c++) {

                $(".row-" + r + "").append('<div class="col-' + c + '" id="d' + r + '-' + c + '"> <img src="image/' + grid[r][c] + '.png" class="candy" style="height:' + altoCelda + 'px; position: absolute"  id=' + r + '-' + c + '></div>')

            }
        }

        console.log(grid)
    }

    llenarTablero();

    // funcion buscar adyacentes 

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
                index: [(y - 1) + "-" + x]
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

                index: [y + '-' + (x - 1)]
            }
        }
    }

    var adyacentes;

    // buscando combos.

    function combos(h) {
        let combo = [];

        for (let y = 0; y < rows; y++) {

            for (let x = 0; x < cols; x++) {

                adyacentes = (surroundings(grid, y, x))

                var up = adyacentes[h].value

                if (up == grid[y][x]) {

                    let pcombo = (y + "-" + x + "/" + adyacentes[h].index)
                    let nuevoAdyacente = adyacentes[h].index + ''
                    let adyacenteYX = nuevoAdyacente.split('-');

                    adyacentes = (surroundings(grid, adyacenteYX[0], adyacenteYX[1]))

                    if (up == adyacentes[h].value) {
                        combo.push(pcombo + "/" + adyacentes[h].index)
                    }
                }
            }
        }

        return combo;
    }

    //Destruir combos VH

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function destruirCombos() {

        let comboV = combos("up");
        let comboH = combos("left");
        let combosVH = comboV.concat(comboH)

        let comboVS = combosVH + ''
        let comboVS2 = (comboVS.split("/"))
        let comboVS3 = (comboVS2 + '').split(",")

        let combosLimpios = quitarDuplicados(comboVS3)

        console.log(combosLimpios)
        console.log(grid)

        for (var i = 0; i < combosLimpios.length; i++) {

            let comboArreglo = combosLimpios[i].split("-")

            if (comboArreglo.length > 1) {
                destruirCombo(comboArreglo[0], comboArreglo[1])
                grid[comboArreglo[0]][comboArreglo[1]] = 0
                score += 10;
                $("#score-text").html(score);

            }
        }

        if (combosLimpios.length > 1) {
            sleep(600).then(() => {
                moverDulcesAdestruidos()
            })
        } else {

            limpiarTablero();
            prepararDulces();
        }
    }

    //mover dulces a espacios destruidos.
    async function moverDulcesAdestruidos() {

        for (let steps = 0; steps < 6; steps++) {

            for (let y = 0; y < rows; y++) {

                for (let x = 0; x < cols; x++) {

                    let adyacentes = (surroundings(grid, y, x));
                    let down = adyacentes.down.value;
                    let index = adyacentes.down.index;

                    if (down == 0 && grid[y][x] > 0) {

                        grid[index[0]][index[1]] = grid[y][x]
                        await renderCandy(y, x, index[0], index[1])
                        grid[y][x] = 0

                    }

                }
            }

        }

        sleep(600).then(() => {

            llenarEspaciosVacios(grid)
        })

        return (grid)

    }



    function renderCandy(y1, x1, y2, x2) {

        $("#" + y1 + "-" + x1 + "").appendTo("#d" + y2 + "-" + x2 + "")
        $("#" + y2 + "-" + x2 + "").remove();
        $("#" + y1 + "-" + x1 + "").attr("id", y2 + "-" + x2)

    }

    $('.btn-reinicio').click(function () {

        if (flagInicio == 1) {

            destruirCombos();

            $('#timer').timer({
                countdown: true,
                duration: '3s',
                format: '%M:%S',
                callback: function () {

                    grid = [];
                    $(".panel-tablero").hide(1000, function () {

                        $(".main-container h1").append('<h3 class="titulo-over" >Juego Terminado</h3>')
                    })

                    $(".panel-score").animate({
                        width: '100%'
                    }, 1000);

                }
            });

            $(this).html("Reiniciar")
            flagInicio = 2;

        } else {
            location.reload();

        }
    });

    //llenar espacios vacios

    function llenarEspaciosVacios(arreglo) {

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (arreglo[r][c] === 0) {
                    grid[r][c] = numRandom()
                }
            }
        }

        limpiarTablero()

        sleep(600).then(() => {
            destruirCombos()
        })

    }


    //limpiar tablero

    function limpiarTablero() {
        $(".panel-tablero").empty();
        llenarTableroJuegoIniciado();
    }

    //Mover dulces con el mouse

    $(".candy").mousedown(function(){

      console.log( $(this).attr("id"))

    
    });


    function prepararDulces() {

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
                var CandyIdDrag = draggable.attr("id")
                var candyIdDrop = droppable.attr("id")
                let candyDragSplit = CandyIdDrag.split("-")
                let candyDropSplit = candyIdDrop.split("-")
                var gridValueDrag = grid[candyDragSplit[0]][candyDragSplit[1]]
                var gridValueDrop = grid[candyDropSplit[0]][candyDropSplit[1]]

                grid[candyDragSplit[0]][candyDragSplit[1]] = gridValueDrop;
                grid[candyDropSplit[0]][candyDropSplit[1]] = gridValueDrag;

                droppable.attr("id", CandyIdDrag)
                draggable.attr("id", candyIdDrop)

                moves += 1;
                $("#movimientos-text").html(moves);

                draggable.css({
                    left: dropPos.left + "px",
                    top: dropPos.top + "px",
                    "z-index": 20
                });

                droppable.css("z-index", 10).animate({
                    left: dragPos.left,
                    top: dragPos.top
                });

                sleep(600).then(() => {
                    destruirCombos()
                })
            }
        });
    }

})