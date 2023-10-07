var grid = document.getElementById("myDiv");
grid.style.height = "400px";
grid.style.width = "400px";
var a = grid.style.height;
var b = grid.style.width;
var myDiv = document.getElementById("snake");
var x = 8;
var colorVar = ["gold", "chocolate", "brown", "red", "purple", "fuchsia", "green", "lime", "olive", "green", "blue", "teal", "aqua"];
var colors = [];
var y = 0;
var speed = 120;
var up=0;
var dow=0;
var X=48;
var Y=48;
var test = document.getElementById("test");
var Xt=16;
var Yt=8;
var sc = document.getElementById("live");
var life_pt = document.getElementById("life");
var sb=[];
var score=[];
var tester=[];
var tsc=0;
var ls=[];
var audio= new Audio("mixkit-bonus-earned-in-video-game-2058.wav")
var audiow= new Audio("mixkit-alien-technology-hum-2134.wav")
var audio_d= new Audio("mixkit-arcade-space-shooter-dead-notification-272.wav")
var audio_ad= new Audio("mixkit-game-blood-pop-slide-2363.wav")
var life= 3;

        life_pt.innerHTML=life;

var highScore;
var lc = document.getElementById("hs");
// sb[0]=document.getElementById("snake");
var newb=document. createElement("div");
var de_up=document.getElementById("block");

// newb.style.backgroundColor = "green";
// newb.style.position="absolute"
// newb.style.width=8+"px";
// newb.style.height=8+"px";

    newb.style.top=Y+"px";
newb.style.left=X+"px";
sb.push(newb);
grid.appendChild(newb);

var newb=document. createElement("div");

newb.style.backgroundColor = "green";
newb.style.position="absolute"
newb.style.width=8+"px";
newb.style.height=8+"px";

    newb.style.top=Y+"px";
newb.style.left=X-16+"px";
sb.push(newb);
grid.appendChild(newb);


var newb=document. createElement("div");

newb.style.backgroundColor = "green";
newb.style.position="absolute"
newb.style.width=8+"px";
newb.style.height=8+"px";

    
    
    
    
 

    
    newb.style.top=Y+"px";
newb.style.left=X-24+"px";
sb.push(newb);
grid.appendChild(newb);

var newb=document. createElement("div");

newb.style.backgroundColor = "green";
newb.style.position="absolute"
newb.style.width=8+"px";
newb.style.height=8+"px";

    
    
    
    
 

    
    newb.style.top=Y+"px";
newb.style.left=X-32+"px";
sb.push(newb);
grid.appendChild(newb);




var sibz=0;
//rand console


function mod(){
    var a=Math.floor(Math.random()*6)+1;
    return a;
}







var X__;
var Y__;

var myDiv_ = document.getElementById("fruit");
var sp=1;
var scr=0;


//random fruit generator
function random_color() {
    var color = colorVar[Math.floor(Math.random() * colorVar.length)];
    while (colors.includes(color)) {
        color = colorVar[Math.floor(Math.random() * colorVar.length)];
    }
    return color;
}



var X_;
var Y_;
var time=300;
document.getElementById("time").innerHTML=300;

setInterval(function gamplay() {


    // setInterval(gamplay,5);
    
    document.getElementById("time").innerHTML=document.getElementById("time").innerHTML-1;
},1000);



var x_=Math.floor(Math.random()*350);
var y_=Math.floor(Math.random()*350);



function respawnX(){
    var x_=Math.floor(Math.random()*350);
    
    return x_;
}

function respawnY(){ 
var y_=Math.floor(Math.random()*350);
return y_;
}







function create_furits() {
            
    const game_screen = document.getElementById("myDiv");
    const ordscr = document.getElementById("ordscr");

    var no_of_fruits = Math.floor(Math.random() *5) + 1;

   
    for (let i = 0; i < no_of_fruits; i++) {
        var color = random_color();
        colors.push(color);
        var new_fruit = document.createElement("div");
        new_fruit.classList.add("fruit_");
        game_screen.appendChild(new_fruit);
        new_fruit.style.left = (Math.random() * 150 + 10).toString() + "px";
        new_fruit.style.top = (Math.random() * 150 + 10).toString() + "px";
        new_fruit.style.backgroundColor = color;

        
    }
    

    // this part will show the sequence of the color blocks
    for (let j = colors.length - 1; j >= 0; j--) {
        var color_block = document.createElement("div");
        color_block.classList.add("fruit-display");
        ordscr.appendChild(color_block);
        color_block.style.backgroundColor = colors[j];
    }
}

// will return the div element which is to be eaten next or the the first div to be eatern
function next_fruit() {
    var fruits_on_screen = document.querySelectorAll(".fruit_");
    return fruits_on_screen[fruits_on_screen.length - 1];
}

function ate_fruit(colors) {
    // to check when all the fruits are eaten
    if (colors.length <= 0) {
        create_furits();
        audiow.play()
    }

    var fruit = next_fruit();

    var fruit_style = fruit.currentStyle || window.getComputedStyle(fruit);
    var snake_style = sb[0].currentStyle || window.getComputedStyle(sb[0]);

    fruit_x_cor = parseFloat(fruit_style.left);
    fruit_y_cor = parseFloat(fruit_style.top);

    snake_x_cor = parseFloat(snake_style.left);
    snake_y_cor = parseFloat(snake_style.top);

    var did_bite = Math.abs(fruit_x_cor - snake_x_cor) < 10 && Math.abs(fruit_y_cor - snake_y_cor) < 10;

    if (did_bite) {
       
        fruit.remove();
        document.querySelectorAll(".fruit-display")[0].remove();
        colors.pop();
        
        
    }
    if(colors.length==0){
        time=time+10;
        document.getElementById("time").innerHTML=time;
    }


}

var int=setInterval(function (){
    
    
    
    ate_fruit(colors);
    

    

    //game setup
    
    X=X+x;
    Y=Y+y;


    //rand operator
    myDiv_.style.top = y_ + "px";
    myDiv_.style.left = x_ + "px";
    
    sb[0].style.top = Y + "px";
    sb[0].style.left = X + "px";
  
    //game over conditions
    if(X==400||X==-8){


        // clearInterval(int); 
        sp=scr;
        sc.innerHTML=0;
        life--;
        life_pt.innerHTML=life;

        score.push(sp);

        X=48;
        Y=48;
        audio_d.play()

    }
    if(Y==400||Y==-8){
        
        sp=scr;
        sc.innerHTML=0;
        life--;
        life_pt.innerHTML=life;

        audio_d.play()
        score.push(sp);
        X=48;
        Y=48;
    } 
    if(life==0){

        clearInterval(int);
        audio_ad.play()
        alert("game over")
    }

    //fruit eating
    if((Math.abs(X-x_)<10)&&Math.abs(Y-y_)<10){
        x_=respawnX();
        y_=respawnY();
        myDiv = document.getElementById("snake");
        
        audio.play();



        myDiv_.style.top = y_ + "px";
    myDiv_.style.left = x_ + "px";
    
    
    
    updateHighScore(scr);
    scr++;
    sc.innerHTML=scr;
     highScore = localStorage.getItem('snakeHighScore');
    
    function updateHighScore(scr) {
        if (scr > highScore) {
            localStorage.setItem('snakeHighScore', scr);
            
        }
    }


    




    
    lc.innerHTML=highScore+1;



    
    X__=X;
    Y__=Y;

    var newb=document. createElement("div");

newb.style.backgroundColor = "green";
newb.style.position="absolute"
newb.style.width=8+"px";
newb.style.height=8+"px";

    newb.style.top=Y+"px";
newb.style.left=X+"px";
sb.push(newb);
grid.appendChild(newb);

    }






//increase length
    for(let i=sb.length-1;i>0;i--){
        sb[i].style.top=sb[i-1].style.top;
        sb[i].style.left=sb[i-1].style.left;

       
        
        }
        for(let i=0;i<sb.length-1;i++){
            if((sb[sb.length-1].style.top==sb[i].style.top)&&(sb[sb.length-1].style.left==sb[i].style.left)){
                //    console.log(sb.length-1)
                //    console.log(i)
                   if(i!=(sb.lenght-1)){
                    audio_d.play()
                    score.push(sp);
                    sc.innerHTML=0;
                    X=48;
                    Y=48;
                    life--;
        life_pt.innerHTML=life;
                   }
        
                //    clearInterval(int);
                  
                }
        }
    },speed);




    // console system
document.addEventListener("keydown", function(KeyboardEvent) {

    if (KeyboardEvent.keyCode === 37&&x!==8) { // Left arrow key

x=-8;
y=0;
    }
    else if (KeyboardEvent.keyCode === 38&&y!==8) { // Up arrow key
    y=-8;
    x=0;
    } else if (KeyboardEvent.keyCode === 39&&x!==-8) { // Right arrow key
x=8;
y=0;
    } else if (KeyboardEvent.keyCode === 40&&y!==-8) { // Down arrow key
    y=8;
    x=0;
    }
});
function moveUp() {
    if (y !== 8) {
      x = 0;
      y = -8;
    }
  }
  
  // Move snake down
  function moveDown() {
    if (y !== -8) {
      x = 0;
      y = 8;
    }
  }
  
  // Move snake left
  function moveLeft() {
    if (x !== 8) {
      x = -8;
      y = 0;
    }
  }
  
  // Move snake right
  function moveRight() {
    if (x !== -8) {
      x = 8;
      y = 0;
    }
  }

  document.getElementById('block').addEventListener('click',moveUp);
    document.getElementById('blockkk').addEventListener('click',moveDown);
    document.getElementById('blockk').addEventListener('click', moveLeft);
    document.getElementById('blockkkk').addEventListener('click', moveRight);