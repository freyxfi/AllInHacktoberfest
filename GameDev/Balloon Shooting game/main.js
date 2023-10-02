var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "9px Arial";

function start(){

var score =0;
var balloonArray = [];
var n = 4; //No. of balloons
var i=0;
var dx = 2; //arrow
var c = 8; //bow
var d = 45; //bow
var p = c; //arrow
var q = d; //arrow
var spaceTap =0; //No. of Key presses
var nArrows = 15; //No. of Arrows
var pause = false;

var gameStart = new Audio('audio/gameStart.wav');
var bowRelease = new Audio('audio/bowRelease.mp3');
var balloonPop = new Audio('audio/balloonPop.wav');
var gameOver = new Audio('audio/gameOver.mp3'); 

gameStart.play();

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}


for(i=0; i<n; i++){
	balloonPosition();
}

function balloonPosition(){
	var a = Math.random()*150 + 110;
	var b = 150;
	var strRad =3;
	var dy = Velocity() ;
	var balloonColor = getRandomColor();
	balloonArray.push(new balloon(a,b,strRad,dy,balloonColor));
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function balloon(a,b,strRad,dy,balloonColor){

	this.a =a;
	this.b =b;
	this.strRad = strRad;
	this.dy = Velocity();
	this.balloonColor = balloonColor;

	this.draw = function(){
		ctx.beginPath();
		ctx.moveTo(this.a,this.b);
		ctx.lineWidth=1;
		ctx.bezierCurveTo(this.a-2, this.b+8, this.a+3, this.b+15, this.a+7.5, this.b+20); //Left down part
		ctx.moveTo(this.a,this.b);
		ctx.bezierCurveTo(this.a+5, this.b-10, this.a+10, this.b-10, this.a+15, this.b); // Upper Semi-Circle
		ctx.bezierCurveTo(this.a+17, this.b+8, this.a+12, this.b+15, this.a+7.5, this.b+20); // Right down part
		ctx.moveTo(this.a,this.b);
		ctx.closePath();
		ctx.fillStyle = this.balloonColor;
		ctx.fill();
		ctx.lineWidth = 0.5;
		ctx.stroke();
		ctx.lineWidth = 1;
	
		ctx.beginPath();
		ctx.arc(this.a+7.5, this.b+23, this.strRad, 3.14*3/2, 0.9, false);
		ctx.arc(this.a+7.5, this.b+26, this.strRad, 3.14*3/2, 1.2, true);
		ctx.stroke();
		ctx.closePath();
 	}

 	this.update = function(){

		if(this.b < -30){
			this.a = Math.random()*150 + 110; 
			this.b = 150;
			this.dy = Velocity() ;
			this.balloonColor = getRandomColor();
			this.draw();
		}
		
		else
			this.b -= Velocity();

		this.draw();
 	}
 
 	this.collide = function(p,q){

 		if( p+33 > this.a && p+33 < this.a+7.5 && q > this.b-8.1 && q < this.b+20){
 			score++;
 			nArrows--;
 			balloonPop.play();
 			this.a = Math.random()*150 + 110;
			this.b = 150;
			this.dy = Velocity() ;
			this.balloonColor = getRandomColor();
			this.draw(); 
 			spaceTap = 0;
 		}
 	}

}

function bow(){
	ctx.fillStyle = "black";
	if( p == c){
		ctx.beginPath();
		ctx.moveTo(c,d);
		ctx.lineTo(c+25,d-15);
		ctx.moveTo(c,d);
		ctx.lineTo(c+25,d+15);
		ctx.stroke();
	}
	else{
		ctx.beginPath();
		ctx.moveTo(c+25,d-15);
		ctx.lineTo(c+25,d+15);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.moveTo(c+25,d-15);
	ctx.lineWidth =2;
	ctx.bezierCurveTo(c+35, d-5, c+35, d+5 , c+25, d+15);
	ctx.stroke();
	ctx.lineWidth =1;
}

function arrowDraw(){
	ctx.beginPath();
	ctx.moveTo(p,q);
	ctx.lineTo(p+33,q); //arrow tip coordinates
	ctx.lineTo(p+28,q-2.5);
	ctx.moveTo(p+33,q);
	ctx.lineTo(p+28,q+2.5);
	ctx.stroke();
}

function arrowUpdate(){		
	if(p<310){
		p += dx;
		arrowDraw();
	}
	else{
		p=c;
		nArrows--;
		spaceTap = 0;
		arrowDraw();	
	}
}
  
function Velocity(){

	if(score < 3){
		return (Math.random()*0.5 + 0.5);
	}
	else if(score >= 3 && score < 7){		
		return (Math.random()*0.5 + 1.08);
	}
	else if(score >= 7 && score < 12){		
		return (Math.random()*0.1 + 1.85);
	}
	else if(score >= 12 && score < 16){
		return (2.1);
	}
	
}


function animate(){
	ctx.clearRect(0,0,innerWidth,innerHeight);
	bow();
	
	for(var i=0; i<balloonArray.length; i++){
		balloonArray[i].update();
		balloonArray[i].collide(p,q);
	}
	arrowDraw();
	if(spaceTap > 0)
		arrowUpdate();
	else
		p=c;
	document.addEventListener('keydown', function(event){	
			if(event.keyCode == 32){  //spacebar keycode
				bowRelease.play();
				p=c;
				q=d;
				spaceTap++;
				arrowUpdate();
		}
	}, false);
	
	ctx.fillStyle = "darkblue";
	ctx.fillText("Score : "+ score,10,10);
	ctx.fillText("Arrows remaining : "+nArrows,10,20);
	ctx.fillStyle = "black";
	
	if(nArrows <= 0){
		pause = true;

			ctx.clearRect(0,0,innerWidth,innerHeight);
			gameOver.play();
			ctx.fillStyle = "#000000";
			ctx.globalAlpha = 0.6;
			ctx.fillRect(50,30,200,100);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "#FF0000";
			ctx.font = "18px Arial";
			ctx.fillText("GAME OVER",90,60);
			ctx.font = "9px Arial";
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("Score : "+score,90,85);
			ctx.fillText("Press R to restart",90,105);
			ctx.fillStyle = "black";

			document.addEventListener('keydown',function(event){
				if(event.keyCode == 82){ //r keyCode
					stopAudio(gameOver);
					start();
				}
			}, false);
			}

	if(pause){
		return;
	}



	requestAnimationFrame(animate);
}
 
animate();
 }

start();