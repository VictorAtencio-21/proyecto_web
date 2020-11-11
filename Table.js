window.onload=function(){

var table=document.getElementById("tablero");

var boton=document.getElementById("inicio");

contexto=table.getContext("2d");

var mouse=false;//para indicar los eventos del mouse

var colores=['blue','green','red','yellow'];//se usa para indicar  los colores de llenado

var inic=(Math.round(((Math.random())*100))%4)-1;//valor inicial para las casillas

var celda_color=[inic,inic,inic,inic,inic,inic,inic,inic,inic];//indica el color del cuadro. 0=azul,1=verde,2=rojo,3=amarillo

var celdas=[[0,0],[100,0],[200,0],[0,100],[100,100],[200,100],[0,200],[100,200],[200,200]];//coordenadas de los cuadros

var timeout=false;//indica cuando el tiempo acaba true=se acabo el tiempo false=aun queda tiempo

var iniciado=false;//indica que inicio el juego true=iniciado false=apagado

var h = 0;//hora

var m = 0;//minutos

var s = 0;//segundos

document.getElementById("hms").innerHTML="00:00:00";


function dibujarCelda(x,y,ancholinea,color){//esta funcion crea la rejilla

    //ancholinea=el grosor
    //color=color(obvio)

    contexto.strokeStyle=color;

    contexto.lineWidth=ancholinea;

    for(let i=x;i<300;i+=100){//se creans lineas

        contexto.moveTo(i,0);
        contexto.lineTo(i,300);
        contexto.stroke();
    }

    for(let i=y;i<300;i+=100){

        contexto.moveTo(0,i);
        contexto.lineTo(300,i);
        contexto.stroke();
    }
}

function pintar(casilla){//pinta las casillas y marca el nuevo color

    let cuadro=celdas[casilla];
    let color;

    if(celda_color[casilla]==3){

        contexto.fillStyle=colores[0];
        celda_color[casilla]=0;
    }

    else{

        color=celda_color[casilla]+1;
        celda_color[casilla]=color;
        contexto.fillStyle=colores[color];

    }
    contexto.fillRect(cuadro[0],cuadro[1],99,99);//se colorea

    Sonido(0,0.5);//por aqui se pone la tonada de coloreado
    Sonido(7,0.4);
    Sonido(4,0.5);

    //comprobra victoria

    let match=0;

    for(let i=0;i<9;i++){

        if(celda_color[i]==inic)
            match+=1;
    }

    if(match==9){

        timeout=true;
        Sonido(3,0.5);

    }
}
function pintarCuadros(cuadro){//no tocar fors no me hago responsable de las ecuaciones

    if(cuadro%2==0){
        if(cuadro<5){
            for(let j=1;j<=cuadro+3;j+=(4-(Math.abs(cuadro-2)))){
                pintar(j);
            }
        }
        else{
            for(let j=cuadro-3;j<=7;j+=(4-(Math.abs(cuadro-6)))){
                pintar(j);
            }
        }
    }
    else{
        let plus=2;
        if(cuadro<5){
            for(let j=0;j<=cuadro+3;j+=plus){
                if(cuadro==1){
                    pintar(j);
                }
                else
                    if(j==0){
                        pintar(j);
                        plus=4;
                    }
                    else{
                        pintar(j);
                        plus=2
                    }
            }
        }
        else{
            for(let j=cuadro-3;j<=8;j+=plus){
                if(cuadro==7){
                    pintar(j);
                }
                else
                    if(j==4){
                        pintar(j);
                        plus=4;
                    }
                    else
                        pintar(j);
            }
        }
    }

}
function colorearCelda(x,y){//se ingresa la posicion del mouse/

    dibujarCelda(0,0,1,"black");//se redibuja la celda

    for (let i = 0; i < celdas.length; i++) {//se busca el cuadro donde esta ubicado el mouse
        let cuadro = celdas[i];
        if(
            (x>cuadro[0]) &&
            (x<cuadro[0]+99) &&
            (y>cuadro[1]) &&
            (y<cuadro[1]+99)
        )
        {
            pintarCuadros(i);
            break;
        }
        
    }

    dibujarCelda(0,0,1,"black");//se redibuja la celda
    
}
function escribir(){//escribe el tiempo en el cronometro

    var hAux, mAux, sAux;
    s++;

    if (s>59){m++;s=0;}

    if (m>59){h++;m=0;}

    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    
    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 

    if(m==5&&s==0){//se coloca el limite de tiempo para resolver el juego

        timeout=true;
        parar();
        Sonido(1,0.6);

    }
    else
        if(timeout){

            parar();
            Sonido(3,0.7);

        }
}
function parar(){//detiene el cronometro
    if(timeout){
        clearInterval(id);
    }
}

//se obtiene la posicion del mouse cuando hace click y en movimiento
table.onmousemove = function(e) {
    if(mouse){
        if(iniciado){
            var canvaspos = table.getBoundingClientRect();
            colorearCelda(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
        }
    }
};

table.onclick = function(e){
    if(iniciado){
        var canvaspos = table.getBoundingClientRect();
        colorearCelda(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
    }
};
boton.onclick=function(e){//inicia el juego
    if(!iniciado){

        escribir();

        id = setInterval(escribir,1000);

        dibujarCelda(0,0,1,"black");

        iniciado=true;
    }
}

//saber si el se esta manteniendo presionado el mouse
table.onmousedown = function() {
    mouse = true;
};

table.onmouseup = function() {
    mouse = false;
};
};
