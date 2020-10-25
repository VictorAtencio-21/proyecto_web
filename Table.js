window.onload=function(){
var table=document.getElementById("tablero");
contexto=table.getContext("2d");
var celdas=[];//aqui se guardan las filas y columnas
var mouse=false//para indicar los eventos del mouse
var colores=["blue","green","red"];//lo usaremos despues para los colores

function dibujarCelda(x,y,ancholinea,color){//esta funcion crea la rejilla
    //ancholinea=el grosor
    //color=color(obvio)
    contexto.strokeStyle=color;
    contexto.lineWidth=ancholinea;
    let columnas=[];//la posiciones de las columnas
    let filas=[];//la posiciones de las filas
for(let i=x;i<=300;i+=100){//se creans lineas
    contexto.moveTo(i,0);
    contexto.lineTo(i,300);
    contexto.stroke();
    columnas.push(i);
}
for(let i=y;i<=300;i+=100){
    contexto.moveTo(0,i);
    contexto.lineTo(300,i);
    contexto.stroke();
    filas.push(i);
}
columnas.push(0);
filas.push(0);
for(let i=0;i<columnas.length;i++){//se guardan los datos de cada linea creada
    for(let j=0;j<filas.length;j++){
        celdas.push([columnas[i],filas[j]]);
    }

}
}
function colorearCelda(x,y){//se ingresa la posicion del mouse
    contexto.fillStyle=colores[2];//se elige un color
    for (let i = 0; i < celdas.length; i++) {//se busca el cuadro donde esta ubicado el mouse
        let cuadro = celdas[i];
        if(
            x>cuadro[0] &&
            x<cuadro[0]+99 &&
            y>cuadro[1] &&
            y<cuadro[1]+99
        )
        {
            contexto.fillRect(cuadro[0],cuadro[1],99,99);//se colorea
            break;
        }
        
    }
    dibujarCelda(0,0,1,"blue");//se redibuja la celda
    
}
//se obtiene la posicion del mouse cuando hace click y en movimiento
table.onmousemove = function(e) {
    if(mouse){
        var canvaspos = table.getBoundingClientRect();
        colorearCelda(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
    }
};

table.onclick = function(e){
    var canvaspos = table.getBoundingClientRect();
    colorearCelda(e.clientX - canvaspos.left, e.clientY - canvaspos.top)
};

//saber si el se esta manteniendo presionado el mouse
table.onmousedown = function() {
    mouse = true;
};

table.onmouseup = function() {
    mouse = false;
};
};
