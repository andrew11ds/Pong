var players = [];
var connections = [];
var b;
var Difficulty=-1;
function Player(id,x,y,v,w,h,s){
   this.id = id;
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.score = s;
}

function Ball(x,y,xv,yv,r){
  this.x = x;
  this.y = y;
  this.xv = xv;
  this.yv = yv;
  this.r = r;
}


var express = require('express');
var app = express();
var server = app.listen(8080);
app.use(express.static('public'));
console.log("Running");
var socket = require('socket.io');
var io = socket(server);


function getCounter(){
	io.sockets.emit('getCounter',connections.length);//Se envia el arreglo de conexiones al cliente
	console.log(connections.length);
}

setInterval(PlayerFrequence,33);


function PlayerFrequence(){ //Envia la información de jugadores  cada 22ms para tener una respuesta rapida y que de tiempo de actualizar los clientes
	io.sockets.emit('PlayerFrequence',players);
}

setInterval(BallFrequence,33);//Envia información de la bola cada 22ms para tener una respuesta rapida y que de tiempo de actualizar la bola de juego en los clientes


function BallFrequence(){
	io.sockets.emit('BallFrequence',b);
}


io.sockets.on('connection',function(socket){
	connections.push(socket);
	getCounter();
	socket.on('start',function(data){
		var p = new Player(socket.id,data.x,data.y,data.w,data.h,data.score);
		players.push(p);
	});

	socket.on('PlayBall',function(data){ //Crea la bola de juego en el servidor
		b = new Ball(data.x,data.y,data.xv,data.yv,data.r);
	});

	socket.on('disconnect',function(data){
		connections.splice(connections.indexOf(socket),1);
		console.log("disconnected");
	});

	socket.on('update',function(data){ //Recibe información de el jugador y se actualiza en el arreglo de jugadores
    var k=0;
		for(var i = 0; i < players.length; i++){
			if(socket.id === players[i].id)
        k=i;
		}
    players[k].x=data.x;
    players[k].y=data.y;
    players[k].w=data.w;
    players[k].h=data.h;
    players[k].score=data.score;

	});



  socket.on('Difficulty',function(DifIndex){
    Difficulty=DifIndex;
  });
  setInterval(setDifficulty,22);
  function setDifficulty(){
    socket.emit('getDifficulty',Difficulty);
  }


	socket.on('updateBall',function(data){ //Recibe información sobre la bola de juego y la actualiza en el servidor
		b.x = data.x;
		b.y = data.y;
		b.xv = data.xv;
		b.yv = data.yv;
		b.r = data.r;
	});

});
