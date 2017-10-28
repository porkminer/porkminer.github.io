function Cell(i,j){
    this.i = i;
    this.j = j;
    this.x = i * size;
    this.y = j * size;
    this.walls = [true,true,true,true];
    this.visited = false;
    
    this.draw = function(){
        noFill();
        stroke(255);
        if (this.walls[0]){
            line(this.x, this.y, this.x+size, this.y);
        }
        if (this.walls[1]){
            line(this.x+size, this.y, this.x+size, this.y+size);
        }
        if (this.walls[2]){
            line(this.x+size, this.y+size, this.x, this.y+size);
        }
        if (this.walls[3]){
            line(this.x, this.y+size, this.x, this.y);
        }
    
        if (this.visited){
            noStroke();
            fill(255, 0, 255, 100);
            rect(this.x,this.y,size,size);
        } else {
            noStroke();
            fill(255,255,255, 100);
            rect(this.x,this.y,size,size);
        }
    }

    this.drawse = function(){
        fill(200,0,200);
        noStroke();
        rect(this.x, this.y, 20, 20);
        stroke(255);
        if (this.walls[0]){
            line(this.x, this.y, this.x+size, this.y);
        }
        if (this.walls[1]){
            line(this.x+size, this.y, this.x+size, this.y+size);
        }
        if (this.walls[2]){
            line(this.x+size, this.y+size, this.x, this.y+size);
        }
        if (this.walls[3]){
            line(this.x, this.y+size, this.x, this.y);
        }

    }
}




Cell.prototype.checkNeighbors = function(){
    let neighbors = [];
    let top = grid[index(this.i,this.j-1)];
    if (top && !top.visited){
        neighbors.push(top);
    }
    let bottom = grid[index(this.i,this.j+1)];
     if (bottom && !bottom.visited){
        neighbors.push(bottom);
    }
    let left = grid[index(this.i-1, this.j)];
     if (left && !left.visited){
        neighbors.push(left);
    }
    let right = grid[index(this.i+1, this.j)];
     if (right && !right.visited){
        neighbors.push(right);
    }
    //console.log(neighbors);
    if (neighbors.length > 0){
        let r = floor(random(0,neighbors.length));
        return neighbors[r];
    } else {
        return undefined;
    }


}
