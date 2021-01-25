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

function destruirCombo(y, x) {
    $("#" + y + "-" + x + "").toggle("puff")
}

function quitarDuplicados(arreglo) {

    let result = arreglo.filter((item, index) => {

        return arreglo.indexOf(item) === index;
    })

    return result
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
        $(".panel-tablero").append('<div class= "row-' + r + '" ></>')

        for (var c = 0; c < cols; c++) {

            grid[r][c] = numRandom()

            $(".row-" + r + "").append('<div class="col-' + c + '" id="d' + r + '-' + c + '"> <img src="image/' + grid[r][c] + '.png" class="candy" style="height:' + altoCelda + 'px; position: absolute"  id=' + r + '-' + c + '></div>')
       
        }
    }

    console.log(grid)

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
                //index: [y + "-" + x - 1]
                index: [y + '-' + (x - 1)]
            }
            // upRight:   getCell(matrix, y-1, x+1),
            //downRight: getCell(matrix, y+1, x+1),
            //downLeft:  getCell(matrix, y+1, x-1),
            //upLeft:    getCell(matrix, y-1, x-1)
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
            }

        }

        if (combosLimpios.length > 1) {
            sleep(500).then(() => {
                moverDulcesAdestruidos()
            })
        }else{
            
         
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

        sleep(500).then(() => {

            llenarEspaciosVacios(grid)

        })

        return (grid)

    }



    /* $.fn.animateAppendTo = function (sel, speed) {
         var $this = this,
             newEle = $this.clone(true).appendTo(sel),
             newPos = newEle.position();
         newEle.hide();
         $this.css('position', 'absolute').animate(newPos, speed, function () {
             newEle.show();
             $this.remove();
         });
         return newEle;
     };*/
    //render Dulces a espacios vacios

    function renderCandy(y1, x1, y2, x2) {

        $("#" + y1 + "-" + x1 + "").appendTo("#d" + y2 + "-" + x2 + "")
        $("#" + y2 + "-" + x2 + "").remove();
        $("#" + y1 + "-" + x1 + "").attr("id", y2 + "-" + x2)
    }


    $('.btn-reinicio').click(function () {

        destruirCombos()
       
        // moverDulcesAdestruidos();
        // console.log(grid)

    });


    
   
        $(".candy").click(function(){
            alert($(this).attr("class"))

        })

    //llenar espacios vacios


    function llenarEspaciosVacios(arreglo) {

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (arreglo[r][c] === 0) {
                    grid[r][c] = numRandom()
                    $("#" + r + "-" + c + "").remove();
                    $("#d" + r + "-" + c + "").append('<img src="image/' + grid[r][c] + '.png" class="candy" style="height:' + altoCelda + 'px;  position: absolute;"  id=' + r + '-' + c + '>')
                    
                   
                
                }
            }
        }
        sleep(500).then(() => {
            destruirCombos()
        })
      
    }


    //Mover dulces con el mouse
    var box = $(".candy");
    var mainCanvas = $(".panel-tablero");

    function hacer(){

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
    }


   



})