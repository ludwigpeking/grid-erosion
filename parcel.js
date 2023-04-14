class Parcel {
  constructor(i, j) {
    //as in manhattan, TODO: aves east to west, streets south to north,
    //south is boolean, false is north,
    //number from east to west, starts from 1
    this.tiles = [];
    this.frontageTiles = [];
    this.accessPoint = null;
    this.i = i
    this.j = j
    this.color = color(random(100, 255), random(200, 255), random(200, 255));

    
    this.prosperity = 1;
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
  
  showCenter() {
    fill(0, 0, 255);
    noStroke();
    rect(this.center.i * res, this.center.j * res, res, res);
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
//a parcel claims a vacant tile adjacent to the parcel and of low traffic value smaller than 2. put the tile into the parcel's tiles array, and change the tile's owner to the parcel. draw the tile with the parcel's color. recalculates the parcel's center and access point.
  claimOneTile() {
    let vacantTiles = [];
    for (let tile of this.tiles) {
      for (let neighbor of tile.neighbors) {
        if (neighbor.owner == openSpace && neighbor.traffic < 2) {
          vacantTiles.push(neighbor);
        }
      }
    }
    if(!vacantTiles.length ==0){
      let randomTile = vacantTiles[Math.floor(random(vacantTiles.length))];
      randomTile.owner = this;
      randomTile.wall = true;
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
  for (let i = 1; i < avenueCount; i++) {
    for (let j = 1; j < streetCount; j++) {
      for (let n = 0; n < 2; n++) {
        for (let k = 1; k <= blockParcelCount; k++) {
          let parcel = new Parcel( i * streetWidth + 
            (i - 1) * blockParcelCount * parcelWidth +
            (k - 1) * parcelWidth,
            j * streetWidth +
            (j - 1) * 2 * parcelDepth +
            n * parcelDepth)
            
            

          parcels.push(parcel);
          parcel.originalClaim();
        }
      }
    }
  }
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


