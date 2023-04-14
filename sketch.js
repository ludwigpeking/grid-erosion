let streetCount = 15;
let avenueCount = 12;
let streetWidth = 4;
let blockParcelCount = 5;

let parcelWidth = 3;
let parcelDepth = 4;
let res = 5;

let parcels = [];
let grid = [];
let tiles = [];

var gridMap; //parcel 
let D = 3; //influence diameter
let cellSize ;
let cols ;
let rows ;

function setup() {
  parcels = [];
  grid = [];
  tiles = [];
  cellSize = Math.ceil(D * 2);
  cols =  avenueCount * streetWidth +   (avenueCount - 1) * blockParcelCount * parcelWidth;
  rows = streetCount * streetWidth + (streetCount - 1) * 2 * parcelDepth;
  createCanvas(cols * res, rows * res);
  background(120);
  openSpace.color = color(120);
  //remove old buttons if there are any
  removeButtonsAndInputsIfThereAre();

  buttons();
  inputs();
  
  for (let i = 0; i < cols; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Tile(i, j);
      tiles.push(grid[i][j]);
    }
  }
  for (let tile of tiles){
     tile.addNeighbors();
  }
  layParcels();
  console.log("Parcels: ", parcels.length, " Tiles: ",tiles.length)
  
  for (let tile of tiles){
    checkNeighbors(tile);
    tile.show();
  }
  
  for (let parcel of parcels){
    parcel.checkCenter();
    // parcel.showCenter();
    parcel.checkAccessPoint();
  }
  gridMap = creategridMap(parcels, cellSize);
  console.log(gridMap)
  
  
}

function draw() {
}

