
//scenes
const scenes = {
  newYork : {
    streetCount: 16,
    avenueCount: 6,
    streetWidth: 4,
    blockParcelCount: 8,
    parcelWidth: 3,
    parcelDepth: 5,
    res: 5,
    needUpdate: true,
    parkEdges: [1/3,0, 2/3,0, 0,1, 1/3,1], //left, right, top, bottom
    parkContinue: true,
    squareEdges: [0,0,0,0,0,0,0,0],  
    broadway: [[1/3,0],[1/3,0],[2/3,0],[1,0]],
  
  },
  portland : {
    streetCount: 12,
    avenueCount: 12,
    streetWidth: 4,
    blockParcelCount: 2,
    parcelWidth: 4,
    parcelDepth: 4,
    res: 5,
    needUpdate: true,
    parkEdges: [1/3,0, 1/3,1,0,1, 1,0],
    parkContinue: false,
    squareEdges: [1/2,0,1/2,1,1/2,-1,1/2,0],
  },
  lucca : {
    streetCount: 8,
    avenueCount: 8,
    streetWidth: 3,
    blockParcelCount: 4,
    parcelWidth: 4,
    parcelDepth: 8,
    res: 5,
    needUpdate: true,
    parkEdges: [0,0,0,0,0,0,0,0],
    parkContinue: false,
    squareEdges: [1/2,0,1/2,1,1/2,0,1/2,1],
  }
}

let currentParams = scenes.newYork;
let {streetCount, avenueCount, streetWidth, blockParcelCount, parcelWidth, parcelDepth, res, parkEdges, parkContinue, needUpdate, squareEdges, broadway} = currentParams;
needUpdate = false;
let selectedScene = Object.keys(scenes)[0];

let parcels = [];
let grid = [];
let tiles = [];

var gridMap; //parcel 
let D = res * 0.6; //influence diameter
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
  inputs();
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
  // console.log("Parcels: ", parcels.length, " Tiles: ",tiles.length)
  
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
  // console.log(gridMap)
  
}

function draw() {
  if (needUpdate) {
      redrawCanvas();
      needUpdate = false;
  }
}

function redrawCanvas() {
  // Clear the canvas and reset grid arrays
  background(120);
  parcels = [];
  grid = [];
  tiles = [];

  // Recalculate cols and rows based on updated values
  cellSize = Math.ceil(D * 2);
  cols = avenueCount * streetWidth + (avenueCount - 1) * blockParcelCount * parcelWidth;
  rows = streetCount * streetWidth + (streetCount - 1) * 2 * parcelDepth;
  resizeCanvas(cols * res, rows * res);

  // Reinitialize the grid and tiles
  for (let i = 0; i < cols; i++) {
      grid.push([]);
      for (let j = 0; j < rows; j++) {
          grid[i][j] = new Tile(i, j);
          tiles.push(grid[i][j]);
      }
  }

  for (let tile of tiles) {
      tile.addNeighbors();
  }

  layParcels();
  // console.log("Parcels: ", parcels.length, " Tiles: ", tiles.length);

  for (let tile of tiles) {
      checkNeighbors(tile);
      tile.show();
  }

  for (let parcel of parcels) {
      parcel.checkCenter();
      parcel.checkAccessPoint();
  }

  gridMap = creategridMap(parcels, cellSize);
  // console.log(gridMap);
  removeButtonsAndInputsIfThereAre();
  inputs();
  buttons();
  // sceneSelect.value(selectedScene);
}

