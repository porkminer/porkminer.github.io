var Player = function(i, j, w, h){
    this.i = i;
    this.j = j;
    this.w = w;
    this.h = h;
    this.won = false;
}

Player.prototype.moveUp = function(){
    if (this.j > 0 && grid[this.i + this.j * cells].walls[0] == false && this.won == false){
        this.j--;
        grid[this.i + this.j * cells].visited = false;
    }
}

Player.prototype.moveDown = function(){
    if (this.j < 39 && grid[this.i + this.j * cells].walls[2] == false && this.won == false){
        this.j++;
        grid[this.i + this.j * cells].visited = false;
    }
}

Player.prototype.moveLeft = function(){
    if (this.i > 0 && grid[this.i + this.j * cells].walls[3] == false && this.won == false){
        this.i--;
        grid[this.i + this.j * cells].visited = false;
    }
}

Player.prototype.moveRight = function(){
    if (this.i < 39 && grid[this.i + this.j * cells].walls[1] == false && this.won == false){
        this.i++;
        grid[this.i + this.j * cells].visited = false;
    }
}

Player.prototype.draw = function(){
    /* fill(0,255,50);
    noStroke();
    ellipse(this.i * 20 + 10, this.j * 20 + 10, 20); */
    if (!this.won){
        image(img,this.i * 20 + 2, this.j * 20 + 2, 15, 15);
    } else {
        image(img2,this.i * 20, this.j * 20);
    }
}