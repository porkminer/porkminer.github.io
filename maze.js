

let size = 20;
let cells = 40;
let h = cells * size;
let w = cells * size;
let grid = [];
let current = undefined;
let stack = [];
let start = Math.floor(Math.random() * (39 - 0 + 1), 10);
let end = Math.floor(Math.random() * (39 - 0 + 1), 10);
let player = new Player(0,0,size,size);
let img;
let img2;
let steps = 0;
function setup(){
    createCanvas(h,w);
    frameRate(100);
    img = loadImage("smile.gif");
    img2 = loadImage("15.gif");
    for(let j = 0; j < cells; j++){
        for(let i = 0; i < cells; i++){
            let cell = new Cell(i,j);
            
            grid.push(cell);
        }
    }

    current = grid[0];
    player.i = grid[start].i;
    player.j = grid[start].j;
    makemaze();
}

function draw(){
    background(0);
    //console.log(grid.length);
    /* if (current){
        current.visited = true;
    
        let next = current.checkNeighbors();
        if (next){
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else {
            current = stack.pop();
        }
    } */
    for(let i = 0; i < grid.length; i++){
        grid[i].draw();
    }
    if (stack.length == 0){
        //setTimeout(rTimer, 10000);
        grid[start].drawse();
        grid[grid.length-end].drawse();
    }
    player.draw();
    
    if (player.i == grid[grid.length-end].i && player.j == grid[grid.length-end].j){
        textSize(150);
        fill(0,255,50);
        text("YOU WIN", 75,h/2);
        player.won = true;
    }
    textSize(32);
    fill(0,255,0);
    text("Steps: " + steps, 0,0);
   
}
function keyPressed(){
    if (keyCode == 37){
        player.moveLeft();
    }
    if (keyCode == 38){
        player.moveUp();
    }
    if (keyCode == 39){
        player.moveRight();
    }
    if (keyCode == 40){
        player.moveDown();
    }
    if (keyCode == 82){
        window.location = "https://porkminer.github.com";
    }
}
function makemaze(){
    if (current){
        current.visited = true;
    
        let next = current.checkNeighbors();
        if (next){
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else {
            current = stack.pop();
        }
    }
    while(stack.length != 0){
        if (current){
            current.visited = true;
        
            let next = current.checkNeighbors();
            if (next){
                next.visited = true;
                stack.push(current);
                removeWalls(current, next);
                current = next;
            } else {
                current = stack.pop();
            }
        }
    }
}


function rTimer(){
    location.reload();
}




var index = function(i, j){
    if (i < 0 || j < 0 || i >= cells || j >= cells){
        return -1;
    }

    return (i + j * cells);
}


function removeWalls(a,b){
    
    let x = a.i - b.i;
    if (x < 0){
        a.walls[1] = false;
        b.walls[3] = false;
        
    } else if (x == 1){
        a.walls[3] = false;
        b.walls[1] = false;
    }
    x = a.j - b.j;
    if (x < 0){
        a.walls[2] = false;
        b.walls[0] = false;
    } else if (x == 1){
        a.walls[0] = false;
        b.walls[2] = false;
    }
}
