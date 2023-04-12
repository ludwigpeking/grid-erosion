const streetCount = 15;
const avenueCount = 12;
const streetWidth = 4;
const blockParcelCount = 5;

const parcelWidth = 3;
const parcelDepth = 4;
const res = 5;

const parcels = [];
const grid = [];
const tiles = [];

var gridMap; //parcel 
const D = 3; //influence diameter
const cellSize = Math.ceil(D * 2);
const cols =
  avenueCount * streetWidth +
  (avenueCount - 1) * blockParcelCount * parcelWidth;
const rows = streetCount * streetWidth + (streetCount - 1) * 2 * parcelDepth;

function setup() {
  createCanvas(cols * res, rows * res);
  background(120);
  openSpace.color = color(120);
  buttons();
  
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

