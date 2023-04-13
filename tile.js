const openSpace = {};

class Tile {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i *res + res/2;
    this.y = j *res + res/2;
    this.streetFront = false;
    this.accessPoint = false;
    this.owner = openSpace;
    
    this.wall = false;
    this.traffic = 0;

    this.frontageIndex = 0;
    
    this.f = 0;
    this.g = 99999;
    this.h = 0;
    this.from = null;
    this.neighbors = [];
  }
  accessrize() {
    this.streetFront = true;
    this.wall = false;
  }
  addNeighbors() {
    this.neighbors = [];
    if (this.i < cols - 1) 
      this.neighbors.push(grid[this.i + 1][this.j]);
    
    if (this.i > 0) 
      this.neighbors.push(grid[this.i - 1][this.j]);
    
    if (this.j < rows - 1) 
      this.neighbors.push(grid[this.i][this.j + 1]);
    
    if (this.j > 0) 
      this.neighbors.push(grid[this.i][this.j - 1]);
    
    if (this.i > 0 && this.j > 0) 
      this.neighbors.push(grid[this.i - 1][this.j - 1]);
    
    if (this.i < cols - 1 && this.j > 0) 
      this.neighbors.push(grid[this.i + 1][this.j - 1]);
    
    if (this.i > 0 && this.j < rows - 1) 
      this.neighbors.push(grid[this.i - 1][this.j + 1]);
    
    if (this.i < cols - 1 && this.j < rows - 1) 
      this.neighbors.push(grid[this.i + 1][this.j + 1]);
    
  }
  show() {
    this.color = this.owner.color;
    noStroke();
    fill(this.color);
    rect(this.i * res, this.j * res, res, res);

    //     if(this.frontageIndex >2 && this.owner != openSpace) {
    //       fill(255,0,0);
    //       noStroke()
    //       rect(this.i * res, this.j* res, res, res)
    //     }
  }
}

function checkNeighbors(tile) {
  tile.frontageIndex = 0;
  for (let neighbor of tile.neighbors) {
    if (neighbor.owner === openSpace) {
      tile.frontageIndex++;
      tile.streetFront = true;
      if (
        tile.owner.frontageTiles &&
        !tile.owner.frontageTiles.includes(tile)
      ) {
        tile.owner.frontageTiles.push(tile);
      }
    }
  }
}

function tileReset() {
  for (let i = 0; i < cols ; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].f = 0;
      grid[i][j].g = 99999;
      grid[i][j].h = 99999;
      grid[i][j].from = null;
      grid[i][j].addNeighbors();
    }
  }
}
