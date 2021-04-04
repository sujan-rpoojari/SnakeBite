     /*SNAKE AND FRUIT*/

const cvs = document.getElementById("snake");	//linking the canvas Id
const ctx = cvs.getContext("2d");	//ctx=context 

const box = 32;	//snake size 

// create the ground images
const ground = new Image();	
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Generating the dafault snake position
let snake = [];
snake[0]= 
 {
  	  x : 13 * box,
    	  y : 3 * box
  };

// create the food
let food = 
{
	    x : Math.floor(Math.random()*17+1) * box,
    	    y : Math.floor(Math.random()*15+3) * box
}

// create the score var
let score = 0;

//control the snake
let d;

document.addEventListener("keydown",direction);

function direction(event)
{
    let key = event.keyCode; 
    if( key == 37 )
    {
         d = "LEFT";
    }
     else if(key == 38 )
    {
        d = "UP";
    } 
    else if(key == 39 )
   {
        d = "RIGHT";
   }
    else if(key == 40)
   {
        d = "DOWN";
    }
}

// check collision function
function collision(head,array)
{
	for(let i = 0; i < array.length; i++)
	{
      	   if(head.x == array[i].x && head.y == array[i].y)
	    {
         	       return true;
       	     }
    	}
    return false;
}

// draw everything to the canvas
function draw()
{
	 ctx.drawImage(ground,0,0);
    	for( let i = 0; i < snake.length ; i++)
	{
        		ctx.fillStyle = ( i == 0 )? "blue" : " red";
        		ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        		ctx.strokeStyle = "blue";
        		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
                 }
    
    	ctx.drawImage(foodImg, food.x, food.y);
    
    	// old head position
   	let snakeX = snake[0].x;
    	let snakeY = snake[0].y;
    
    	// which direction
    	if( d == "LEFT") snakeX -= box;
                      if( d == "UP") snakeY -= box;
                      if( d == "RIGHT") snakeX += box;
 	if( d == "DOWN") snakeY += box;
    

// if the snake eats the food
    if(snakeX == food.x && snakeY == food.y)
	{
        	     score++;
       	
       	     food =
	     {
          	         x : Math.floor(Math.random()*17+1) * box,
           	         y : Math.floor(Math.random()*15+3) * box
      	     }
				 }
	else
	 {
	   snake.pop(); 	// remove additional tails
	}
	// add new Head
    
    	let newHead = 
   	{
        		x : snakeX,
       		 y : snakeY
    	}


  if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake))
   {
      clearInterval(game);


     //print("GAme over")
    //var str="game"
    //var result=
   // document.write("Game Over:Your Score is:"+score);

    }
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}
// call draw function every 100 ms

let game = setInterval(draw,100);

















