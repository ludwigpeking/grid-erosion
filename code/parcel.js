class Parcel {
  constructor(i, j) {
    //as in manhattan, TODO: aves east to west, streets south to north,
    //south is boolean, false is north,
    //number from east to west, starts from 1
    this.tiles = [];
    this.frontageTiles = [];
    this.accessPoint = null;
    //in p5js context (i,j)is the top left tile of the parcel
    this.i = i;
    this.j = j;
    this.color = color(random(100, 255), random(200, 255), random(200, 255));

    this.prosperity = 3;
  }
  
  originalClaim(){
    for (let i = 0; i < parcelWidth; i++) {
      for (let j = 0; j < parcelDepth; j++) {
        this.tiles.push(grid[this.i + i][this.j + j]);

        grid[this.i + i][this.j + j].owner = this;
        grid[this.i + i][this.j + j].wall = true;
      }
    }
  }

  checkCenter() {
    let sumI = 0;
    let sumJ = 0;
    for (let tile of this.tiles) {
      sumI += tile.i;
      sumJ += tile.j;
    }
    let centerI = round(sumI / this.tiles.length);
    let centerJ = round(sumJ / this.tiles.length);
    this.center = grid[centerI][centerJ];
  }
  
  // showCenter() {
  //   fill(0, 0, 255);
  //   noStroke();
  //   rect(this.center.i * res, this.center.j * res, res, res);
  // }
  
  checkFrontage() { 
    for (let tile of this.tiles) {
      checkNeighbors(tile);
    }
  }

  checkAccessPoint() {
    let nearest = 9999;
    for (let tile of this.frontageTiles) {
      let d = dist(this.center.i, this.center.j, tile.i, tile.j);
      if (d < nearest) {
        this.accessPoint = tile;
        nearest = d;
      }
    }
    this.accessPoint.wall = false;
    this.accessPoint.accessPoint = true;
    fill(0, 0, 255);
    noStroke();
    rect(this.accessPoint.i * res, this.accessPoint.j * res, res, res);
  }

  show() {
    for (let tile of this.tiles) {
      fill(this.color);
      noStroke();
      rect(tile.i * res, tile.j * res, res, res);
    }
    this.checkCenter();
    this.checkFrontage();
    this.checkAccessPoint();
  }

  update(){
    this.checkCenter();
    this.checkFrontage();
    this.checkAccessPoint();
  }

//a parcel claims a vacant tile adjacent to the parcel and of low traffic value smaller than 2. put the tile into the parcel's tiles array, and change the tile's owner to the parcel. draw the tile with the parcel's color. recalculates the parcel's center and access point.
  claimOneTile() { //TODO:this claim has not considered prosperity is therefore not polished
    let vacantTiles = [];
    for (let tile of this.tiles) {
      for (let neighbor of tile.neighbors) {
        if (neighbor.owner == openSpace && neighbor.traffic * random() < 1 && (tile.i == neighbor.i || tile.j == neighbor.j)) {
          vacantTiles.push(neighbor);
          
        }
      }
    }
    if(!vacantTiles.length ==0){
      let randomTile = vacantTiles[Math.floor(random(vacantTiles.length))];
      randomTile.owner = this;
      randomTile.wall = true;
      fill(0)
      rect( randomTile.i * res, randomTile.j * res, res, res);
      this.tiles.push(randomTile);

      for (let tile of this.tiles){
        checkNeighbors(tile);
        tile.show();
      }
      this.checkCenter();
      this.checkAccessPoint();
    }
}
  
}

function layParcels() {
  const parks = [];
  let currentScene = scenes.newYork;

  const parkEdges = currentScene.parkEdges;
    const squareEdges = currentScene.squareEdges;

    const parkAvenueStart = Math.floor(currentScene.avenueCount * parkEdges[0]) + parkEdges[1];
    const parkStreetStart = Math.floor(currentScene.streetCount * parkEdges[2]) + parkEdges[3];
    const parkAvenueEnd = Math.ceil(currentScene.avenueCount * parkEdges[4]) + parkEdges[5];
    const parkStreetEnd = Math.floor(currentScene.streetCount * parkEdges[6]) + parkEdges[7];


  for (let i = 1; i < avenueCount; i++) {
    for (let j = 1; j < streetCount; j++) {
      // Check if the current blocks should be a park, based on the conditions
      if (i > parkAvenueStart && i < parkAvenueEnd && j > parkStreetStart && j < parkStreetEnd) {
        // Create the park tiles here and add them to the parks array or mark them differently
        let parkTile = new Parcel(
          i * streetWidth + 
          (i - 1) * blockParcelCount * parcelWidth,
          j * streetWidth + 
          (j - 1) * 2 * parcelDepth
        );
        parkTile.isPark = true; // Marking the tile as park
        parkTile.wall = true;   // Making the park non-traversable
        parks.push(parkTile);
        continue;
      }

      for (let n = 0; n < 2; n++) {
        for (let k = 1; k <= blockParcelCount; k++) {
          let parcel = new Parcel(
            i * streetWidth +
            (i - 1) * blockParcelCount * parcelWidth +
            (k - 1) * parcelWidth,
            j * streetWidth +
            (j - 1) * 2 * parcelDepth +
            n * parcelDepth
          );

          parcels.push(parcel);
          parcel.originalClaim();
        }
      }
    }
  }

//   for (let avenue = 0; avenue < currentScene.avenueCount; avenue++) {
//     for (let street = 0; street < currentScene.streetCount; street++) {

//         let x = ((currentScene.streetCount - street) * currentScene.streetWidth + 
//                 (currentScene.streetCount - street - 1) * currentScene.blockParcelCount * currentScene.parcelWidth) * currentScene.res;

//         let y = ((currentScene.avenueCount - avenue) * currentScene.streetWidth + 
//                 (currentScene.avenueCount - avenue - 1) * 2 * currentScene.parcelDepth) * currentScene.res;

//         if (avenue >= parkAvenueStart && avenue <= parkAvenueEnd && street >= parkStreetStart && street <= parkStreetEnd) {
//             parks.push(new Tile(x, y, true));
//         } else if (currentScene.squareEdges && avenue >= squareEdges[0] && avenue <= squareEdges[2] && 
//                    street >= squareEdges[1] && street <= squareEdges[3]) {
//             // This is a square tile, if squareEdges are defined
//             parks.push(new Tile(x, y, true));  
//         } else {
//             // Normal parcel creation here
//         }
//     }
// }
  
  // Drawing the park tiles as green spaces, add this to your drawing function
  parks.forEach(parkTile => {
    fill(0, 255, 0); // Green color for the park
    noStroke();
    rect(parkTile.x * res, parkTile.y * res, res, res); // Adjust as needed
  });
}

//extend class parcel that is not created by the args,but by (i, j), also do not add the 2D array of tiles to its tiles property. only add tiles[i][j]

class SpawnedParcel extends Parcel {
  constructor(i, j) {
    super();
    this.i = i;
    this.j = j;
    this.tiles = [];
    this.tiles.push(grid[i][j]);
    grid[i][j].owner = this;
    grid[i][j].wall = true;
    
  }
}

function redrawParcels(){
  for (let parcel of parcels){
    parcel.show();
  }
}

