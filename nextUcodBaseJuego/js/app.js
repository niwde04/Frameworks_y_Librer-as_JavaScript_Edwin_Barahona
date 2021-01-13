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

 
    //hacer los dulces drag

    //$( ".candy" ).draggable();

    //intercambiar dulces
/*
   $.fn.swapWith = function(to) {
        return this.each(function() {
            var copy_to = $(to).clone();
            var copy_from = $(this).clone();
            $(to).replaceWith(copy_from);
            $(this).replaceWith(copy_to);
        });
    };


    options = { revert: true };

    $(".candy").draggable(options);

    $('.panel-tablero').droppable({
        drop: function(event, ui) {
       window.setTimeout(function(){
            $('#c10').swapWith($('#c20'));
           $(".candy").draggable(options);
       }, 600);
        }
    });


    $(".candy").click(function(){

        console.log($(this).attr("id"))
    })

    $(".candy").mousedown(function(){
        $(this).mousedown(console.log("si"))
    })
*/

/*
$.fn.swap = function (elem) {
    elem = elem.jquery ? elem : $(elem);
    return this.each(function () {
        $(document.createTextNode('')).insertBefore(this).before(elem.before(this)).remove();
    });
};

$(".candy").draggable();

$('.panel-tablero').droppable({
    drop: function(event, ui) {
   window.setTimeout(function(){
        $('#c10').swap($('#c20'));
        $(".candy").draggable();
   }, 600);
    }
})



$('#c30').click(function () {
    $('#c10').swap('#c20');
});
*/

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



})