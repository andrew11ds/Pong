var socket;
var ClientPlayer;
var b;
var StartGame = false;
var players = [];
var difficulty = ['EASY','MEDIUM','HARD',''];
var speed = [7,8,10];
var counter = 0;
var barra;
var barra2;
var barra3;
var barra4;
var barra5;
var barra6;
var barra7;
var barra8;
var barra9;
var barra10;
var barra11;
var barra12;
var barra13;
var barra14;
var barra15;
var barra16;
var barra17;
var barra18;
var barra19;
var barra20;
var client=false;
var DifIndex=0;
var SelectedMode=false;
var DifIndex2=0;


document.onkeydown = function(event) {
  MotionK=event;
    if(event.keyCode === 38 && DifIndex>0 && DifIndex !=4 && client===true) {
        DifIndex--;;

    }
    else if (event.keyCode === 40 && DifIndex<2 && client===true) {
      DifIndex++;
    }
    else if (event.keyCode===13 && client===true) {
      socket.emit('Difficulty',DifIndex);
      SelectedMode=true;
      text(difficulty[3],width/2 - 200,height/2);
    }
}


function setup(){
    socket = io.connect('http://localhost:8080');
    createCanvas(1280,670);
    b = new ball();
    barra = new Barra((width / 2) - 15, (height / 2) - 40, 15, 70);  //Inicializamos todas las barras de jueStartGame
    barra2 = new Barra((width / 2) + 15, (height / 2) - 40, 15, 70);
    barra3 = new Barra((width / 2) - 15, (height / 2) + 40, 15, 70);
    barra4 = new Barra((width / 2) + 15, (height / 2) + 40, 15, 70);
    barra9 = new Barra((width / 2) - 15, (height / 2) - 40-59, 15, 45);
    barra10 = new Barra((width / 2) + 15, (height / 2) - 40-59, 15, 45);
    barra11 = new Barra((width / 2) - 15, (height / 2) + 40+59, 15, 45);
    barra12 = new Barra((width / 2) + 15, (height / 2) + 40+59, 15, 45);
    barra5 = new Barra((width / 2), height / 2 + 50, 15, 50);
    barra6 = new Barra((width / 2), height / 2 - 50, 15, 50);
    barra7 = new Barra((width / 2), height / 2 + 130, 45, 15);
    barra8 = new Barra((width / 2), height / 2 - 130, 45, 15);
    barra13 = new Barra(7,height-27,15,50);
    barra14 = new Barra(7,27,15,50);
    barra15 = new Barra(width-7,27,15,50);
    barra16 = new Barra(width-7,height-27,15,50);
    barra17 = new Barra(7,height-81,15,50);
    barra18 = new Barra(7,81,15,50);
    barra19 = new Barra(width-7,81,15,50);
    barra20 = new Barra(width-7,height-81,15,50);
    socket.on('getCounter',function(Connections){
      counter = Connections; //Contador del arreglo de conexiones
      if(ClientPlayer === undefined){ //Jugador siempre estara en Nulo hasta que se reciba la información de la conexión
      if(counter % 2 !== 0 ){
        ClientPlayer = new Player(0);//Si la conexión es par el jugador jugara a la izquierda, sino sera a la derecha
        client=true;
      }
      else{
        ClientPlayer = new Player(width);
      }
    }
  socket.emit('start',ClientPlayer); //Le envia al servidor la información del jugador para iniciar la partida
  socket.emit('PlayBall',b); //Le envia al servidor la información de la bola de juego al servidor

  socket.on('getDifficulty',function(diff){
    if (diff!=-1) {
      DifIndex=diff;
      DifIndex2=DifIndex;
      DifIndex=4;
      SelectedMode=true;
    }
  });
  if(counter === 2){ //Cuando el arreglo de conexiones llegue a 2 comenzara la partida
    StartGame = true;
    b.xv=speed[DifIndex2];
    b.yv=speed[DifIndex2];
  }
});


  socket.on('PlayerFrequence',function(playerdata){ //Recibe la información
    players = playerdata;
  });

  socket.on('BallFrequence',function(Ball){
    if(Ball !== null){
      b.x = Ball.x,
      b.y = Ball.y,
      b.xv = Ball.xv,
      b.yv = Ball.yv,
      b.r = Ball.r
  }
  });

}

function draw(){


    background(0);
    textSize(80);
    fill(255, 255, 255);
    if(StartGame === false || SelectedMode===false){
      if (client===true) {
        if (DifIndex>=0 && DifIndex<=2) {
          text(difficulty[DifIndex],width/2 - 100,height/2);
          textSize(50);
          text("Select a difficulty mode ",width/2 - 300,height-150);

        }
        else{
          textSize(40);
          text("Waiting for the match to start...",width/2 - 300,height-150);
        }
      }
      else {
          textSize(40);
          text("Waiting for the match to start...",width/2 - 300,height/2);


      }


    }

    fill(0, 102, 153);
    if(StartGame === true && SelectedMode===true){



    for(var i = 0; i < players.length; i++){
      var id = players[i].id;
      if(id !== socket.id){ //Se asigna el color rojo al contrincante indicando que es enemigo
        fill(255,0,0);
        rectMode(CENTER);
        rect(players[i].x,players[i].y,players[i].w,players[i].h);
      }
    }
    showscore(players);
    ClientPlayer.show();
    ClientPlayer.move();
    b.show();
    b.move();
    barra.show();
    barra2.show();
    barra3.show();
    barra4.show();
    barra5.show();
    barra6.show();
    barra7.show();
    barra8.show();
    barra9.show();
    barra10.show();
    barra11.show();
    barra12.show();



      if (DifIndex2===0 || DifIndex2===1) {
        barra13.show();
        barra14.show();
        barra15.show();
        barra16.show();

        if (DifIndex2===0) {
          barra17.show();
          barra18.show();
          barra19.show();
          barra20.show();

      }

      }


    if(b.collision(ClientPlayer) && ClientPlayer.x === 0){
      b.xv = speed[DifIndex2];
    }
    if(b.collision(ClientPlayer) && ClientPlayer.x === width){
      b.xv = -speed[DifIndex2];;
    }
    if (b.colissionbar(barra)) {
     b.xv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra3)) {
     b.xv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra2)) {
     b.xv = speed[DifIndex2];;
  }
  if (b.colissionbar(barra4)) {
     b.xv = speed[DifIndex2];;
  }
  if (b.colissionbarext(barra7)) {
     b.yv = speed[DifIndex2];;
  }
  if (b.colissionbarext(barra8)) {
     b.yv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra9)) {
     b.xv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra10)) {
     b.xv = speed[DifIndex2];;
  }
  if (b.colissionbar(barra11)) {
     b.xv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra12)) {
     b.xv = speed[DifIndex2];;
  }


  if (b.colissionbar(barra13) && (DifIndex2===0 || DifIndex2===1)) {
     b.xv = speed[DifIndex2];;
  }
  if (b.colissionbar(barra14) && (DifIndex2===0 || DifIndex2===1)) {
     b.xv = speed[DifIndex2];;
  }
  if (b.colissionbar(barra15) && (DifIndex2===0 || DifIndex2===1)) {
     b.xv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra16) && (DifIndex2===0 || DifIndex2===1)) {
     b.xv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra17) && DifIndex2===0) {
     b.xv = speed[DifIndex2];;
  }
  if (b.colissionbar(barra18) && DifIndex2===0) {
     b.xv = speed[DifIndex2];;
  }
  if (b.colissionbar(barra19) && DifIndex2===0) {
     b.xv = -speed[DifIndex2];;
  }
  if (b.colissionbar(barra20) && DifIndex2===0) {
     b.xv = -speed[DifIndex2];;
  }

    if(b.x < 0){
      throwBall();
      if(ClientPlayer.x === width)
        ClientPlayer.score++;
    }
    if(b.x > width){
        throwBall();
        if(ClientPlayer.x === 0)
          ClientPlayer.score++;
    }
 socket.emit('update',ClientPlayer);
  socket.emit('updateBall',b);
}}

function throwBall(){ //Posiciona la bola de juego en la mitad
    b.x = width / 2;
    b.y = height /2;
}

function showscore(p){
  textSize(80);
  fill(0, 102, 153);
  for(var i = 0; i < p.length; i++){
    if(p[i].score !== undefined){
      if(p[i].x === 0){
        text(p[i].score.toString(), width/2 - 100, height-100);
        if (p[i].score>=3) {
          StartGame=false;
          text("", width/2 - 100, height/2);
          alert("Juego terminado!");
        }
      }

      else{
        text(p[i].score.toString(), width/2 + 100, height-100);
        if (p[i].score>=3) {
          StartGame=false;
          text("", width/2 - 100, height/2);
          alert("Juego terminado!");
        }
      }

    }
  }
}
