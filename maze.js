

let size = 40;
let cells = 20;
let h = cells * size;
let w = cells * size;
let grid = [];
let current = undefined;
let stack = [];
let start = Math.floor(Math.random() * ((cells -1) - 0 + 1), 10);
let end = Math.floor(Math.random() * ((cells -1) - 0 + 1), 10);
let player = new Player(0,0,size,size);
let img;
let img2;
let steps = 0;
let canvas;
let mc;
let swipe;
let DeltaX = 0;
let DeltaY = 0;
let backgroundMusic;
let cheering;
let heartbeat;
function setup(){
    createCanvas(h,w);
    backgroundMusic = new Howl({
        src: ['https://porkminer.github.io/background.mp3', 'https://porkminer.github.io/background.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
    cheering = new Howl({
        src: ['https://porkminer.github.io/cheering.mp3', 'https://porkminer.github.io/cheering.mp3'],
        autoplay: false,
        loop: false
    });
    heartbeat = new Howl({
        src: ['https://porkminer.github.io/heartbeat.mp3', 'https://porkminer.github.io/heartbeat.mp3'],
        autoplay: false,
        loop: false
    });
    var options = {
        preventDefault: true
      };
    
      // document.body registers gestures anywhere on the page
      var hammer = new Hammer(document.body, options);
      hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
      });
    
      hammer.on("swipeup", swipeup);
      hammer.on("swipedown", swipedown);
      hammer.on("swipeleft", swipeleft);
      hammer.on("swiperight", swiperight);
    

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
    backgroundMusic.play();
}
function swiperight(event){
    player.moveRight();
}
function swipeleft(event){
    player.moveLeft();
}
function swipedown(event){
    player.moveDown();
}
function swipeup(event){
    player.moveUp();
}

function draw(){
    background(0);
    doheartbeat();
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
        if (!cheering.playing){
            cheering.play();
        }
    }
    textSize(32);
    fill(0,255,0);
    text("Steps: " + steps, 0,32);
   
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

function doheartbeat(){
    if (Math.floor(Math.random() * (100 - 1 + 1), 10) > 80 && !heartbeat.playing){
        heartbeat.fade(0,1, 1250);
        setTimeout(heartbeat.fade(1,0,1250), 1000);
        
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



