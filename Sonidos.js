var Sonidos= [261,277,293,311,329,349,369,392,415,440,466,493];//frecuencias:do,#do,re,#re...
var context = new (window.AudioContext || window.webkitAudioContext)();
 
function Sonido(nota,time){
     //se crea oscilador
    var osc = context.createOscillator();
 
    //se elige un tipo de onda: sine, square, sawtooth, triangle
    osc.type = 'sine'; 
 
    osc.frequency.value=Sonidos[nota];
 
    //se asigna el destino para el sonido
    osc.connect(context.destination);
    //se inicia la nota
    osc.start();
    //se detiene la nota x tiempo despues
    osc.stop(context.currentTime +time);
 
}