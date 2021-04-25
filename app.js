const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
pen.fillStyle = 'yellow';


const cs = 55;
const H = 550;
const W = 1000;
let food = null;
let score = 0;


const snake = {
    
    // Initial length of the snake
    init_len: 5,
    // Default direction of the snake
    direction: 'right',

    // cells array contain all the {x,y} for each cell
    cells: [],
    
    createSnake: function () {
        
        for (let i = 0; i < this.init_len; i++){
            this.cells.push({
                x: i,
                y:0
            })
        } 
    },

    drawSnake: function () {
        
        for (let cell of this.cells) {
            pen.fillRect(cell.x*cs, cell.y*cs, cs-2, cs-2);
        }
    
    },
    updateSnake: function () {
        

        // Getting the coordinates for current head of a snake
        const headX = this.cells[this.cells.length-1].x;
        const headY = this.cells[this.cells.length-1].y;
        
        // Collision of snake and food
        if (headX === food.x && headY === food.y) {
            food = getRandomFood(); //creating new food after collision of snake head & food
            score++;  //updating score after eating food
        } else {
            // Removing the first cell
            this.cells.shift(); //when snake will eat the food then its length will increase else would not increase
        }

    
        let nextX, nextY;
        // Getting the coordinates for next cell to pushed 
       

        if (this.direction == 'up') {
            nextX = headX;
            nextY = headY - 1;

            if (nextY * cs < 0) {   //game over condition for upside direction 
                clearInterval(id);
                pen.fillStyle = 'red';
                pen.fillText('Game Over!', 50, 100);
            }
            
        }
        else if (this.direction == 'down') {
            nextX = headX;
            nextY = headY + 1;

            if (nextY * cs >= H) {   //game over condition for downwards collision
                clearInterval(id);
                pen.fillStyle = 'red';
                pen.fillText('Game Over!', 50, 100);
            }
        }
        else if (this.direction == 'left') {
            nextX = headX - 1;
            nextY = headY;

            if (nextX * cs < 0) {   //game over condition for left side
                clearInterval(id);
                pen.fillStyle = 'red';
                pen.fillText('Game Over!', 50, 100);
            }

        }
        else {
            nextX = headX + 1;
            nextY = headY;

            if (nextX * cs >= W) {   //game over condition for right-direction
                clearInterval(id);
                pen.fillStyle = 'red';  //text color of game-over string
                pen.fillText('Game Over!', 50, 100);
            }

        }



        // Adding the new cell at headX+1,headY+1
        this.cells.push({
            x: nextX,
            y: nextY
        })
    }
}



// Initialise the Game
function init() {
    snake.createSnake();

    food = getRandomFood();

    pen.fillText(`Score ${score}`, 50, 60);  //for generating score string

    function keypressed(e) {
        // console.log(e);
        // console.log("KeyPressed");

        if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        }
        else if (e.key === 'ArrowUp') {
            snake.direction = 'up';
        }
        else if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        }
        else {
            snake.direction = 'right';
        }

        console.log(snake.direction);
    }


    document.addEventListener('keydown', keypressed);
}


// draw

function draw() {
    pen.clearRect(0, 0, W, H);
    pen.font = '25px sans-serif';  //managing size of score string
    pen.fillText(`Score: ${score}`, 50, 60); //for generating score string
    pen.fillStyle = 'burlywood';  // color of food
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);  //drawing food
    pen.fillStyle = 'yellow'; // color of snake
    snake.drawSnake();
}

// update 

function update() {
    snake.updateSnake();
}



// Game Loop
function gameLoop() {
   
    draw();
    update();
}

function getRandomFood() {
    
    const foodX = Math.floor(Math.random() * (W - cs)/cs);  //for generating food at same level & in bw the frame:
    const foodY = Math.floor(Math.random() * (H - cs)/cs);  //(W-cs) & (H-cs) for creating food inside the frame & dividing by cell size for creating food at same level as that of snake.


    const food = {
        x: foodX,
        y: foodY
    }

    return food;
}


// Calling the init function and initilising the game
init();



const id = setInterval(gameLoop, 150);
