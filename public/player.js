var motionK=0; // Variable global que controla cual tecla ha sido presionada
function Player(x){
   this.x = x;
   this.y = height/2;
   this.v = 7;
   this.w = 20;
   this.h = 80;
   this.score = 0;
   this.show = function(){
    fill(255);
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h)
   }

   this.move = function(){
       if (motionK===38) { //Dependiendo si es arriba o abajo la velocidad se invierte para poder mover el jugador
         this.y-=this.v;

       }else if (motionK===40){ //https://cdn.socket.io/socket.io-1.4.5.js
         this.y+=this.v;
       }
     }


   }

   function Motion(event){ //Función invocada por el codigo HTML la cual controla la tecla presionada
     motionK=event.keyCode;
   }

   function StopMotion(event){//Función invocada por el codigo HTML al soltar una tecla.
     if (event.keyCode===motionK) { //Se hace la validación si la tecla soltada era la misma que se estaba presionando
       motionK=0;
     }

   }
