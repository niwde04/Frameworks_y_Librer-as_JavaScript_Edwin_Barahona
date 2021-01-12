function colorTituloBlanco(){

    $(".main-titulo").animate({color:"white"},"slow",function(){
        colorTituloAmarillo();
    })

}

function colorTituloAmarillo(){

    $(".main-titulo").animate({color:"yellow"},"slow",function(){
        colorTituloBlanco();
    })

}

colorTituloBlanco()

$( document ).ready(function() {

    var dulce= 0;
    var i = 0;
    //$(this).attr('src',"image/"+dulce+".png");

while(i < 4){

    dulce= Math.floor(Math.random() * (4) + 1);
    $(".col-1 .dulce").after('<img src="image/'+dulce+'.png" class="carta"/>');
    i++;

}

i=0;
while(i < 4){
    dulce= Math.floor(Math.random() * (4) + 1);
    $(".col-2 .dulce").after('<img src="image/'+dulce+'.png" class="carta"/>');
    i++;

}

i=0;
while(i < 4){
    dulce= Math.floor(Math.random() * (4) + 1);
    $(".col-3 .dulce").after('<img src="image/'+dulce+'.png" class="carta"/>');
    i++;

}

i=0;
while(i < 4){
    dulce= Math.floor(Math.random() * (4) + 1);
    $(".col-4 .dulce").after('<img src="image/'+dulce+'.png" class="carta"/>');
    i++;

}

i=0;
while(i < 4){
    dulce= Math.floor(Math.random() * (4) + 1);
    $(".col-5 .dulce").after('<img src="image/'+dulce+'.png" class="carta"/>');
    i++;

}
   

i=0;
while(i < 4){
    dulce= Math.floor(Math.random() * (4) + 1);
    $(".col-6 .dulce").after('<img src="image/'+dulce+'.png" class="carta"/>');
    i++;

}
   

i=0;
while(i < 4){
    dulce= Math.floor(Math.random() * (4) + 1);
    $(".col-7 .dulce").after('<img src="image/'+dulce+'.png" class="carta"/>');
    i++;

}
   


    

})