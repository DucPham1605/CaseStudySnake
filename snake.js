
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;


const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";



let dead = new Audio();
let eat = new Audio();
let start = new Audio();

start.src ="audio/indie.mp3";
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";




let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};



let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}



let score = 0;



let d;

document.addEventListener("keydown",direction);

function direction(event){
    start.play();
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){

        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";

    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";

    }else if(key == 40 && d != "UP"){
        d = "DOWN";

    }
}


function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


function draw(){
    ctx.drawImage(ground,0,0);
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    

    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }

    }else{
        snake.pop();
    }
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// chay game moi 100s

let game = setInterval(draw,100);


















