// game constants and variables
let inputDir = { x: 0, y: 0};
const foodSound = new Audio('foodsound.mp3');
const gameOver = new Audio('gameover.mp3');
let speed = 3;

let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15}
]
food = {x: 6, y: 7};
// game function
function main(ctime){
    window.requestAnimationFrame(main);
   console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake)
{
    // if you bump into yourself
   for (let i = 1; i < snakeArr.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
            
            break;
        }
    }
      // if you bump into wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
        {
        
            return true;
            
        }    
}


function gameEngine()
{
    // part 1: updating the snake array & food
    if(isCollide(snakeArr))
    {
        inputDir = {x: 0, y: 0};
        alert("Game over, Press any key to play again!");
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
        gameOver.play();
        snakeArr = [{x: 13, y: 15}];
            
    }
    



    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiScoreBox.innerHTML = "High Score : " + hiscoreval;

        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        foodSound.play();
        let a =2;
        let b = 16;
        food = {x:Math.round(a + (b-a)* Math.random()), y:Math.round(a + (b-a)* Math.random())}
    }

    // Moving the Snake
    for (let i = snakeArr.length - 2; i>=0; i--)
    {
        
        snakeArr[i+1] = {...snakeArr[i]};
    }


    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // part 2: display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    // display the food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}








// main logic starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "High Score : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e =>
{
    inputDir = {x: 0, y: 1} //start the game
   // foodSound.play();
    switch (e.key)
{
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;  
                break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default: 
            break;
}})
