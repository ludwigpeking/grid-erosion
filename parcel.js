class Parcel {
  constructor(avenue, street, south, number) {
    //as in manhattan, TODO: aves east to west, streets south to north,
    //south is boolean, false is north,
    //number from east to west, starts from 1
    this.tiles = [];
    this.frontageTiles = [];
    this.accessPoint = null;
    this.i =
      avenue * streetWidth +
      (avenue - 1) * blockParcelCount * parcelWidth +
      (number - 1) * parcelWidth;
    this.j =
      street * streetWidth +
      (street - 1) * 2 * parcelDepth +
      south * parcelDepth;
    this.color = color(random(100, 255), random(200, 255), random(200, 255));

    for (let i = 0; i < parcelWidth; i++) {
      for (let j = 0; j < parcelDepth; j++) {
        this.tiles.push(grid[this.i + i][this.j + j]);

        grid[this.i + i][this.j + j].owner = this;
        grid[this.i + i][this.j + j].wall = true;
      }
    }
    this.prosperity = 1;
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
}

function layParcels() {
  for (let i = 1; i < avenueCount; i++) {
    for (let j = 1; j < streetCount; j++) {
      for (let n = 0; n < 2; n++) {
        for (let k = 1; k <= blockParcelCount; k++) {
          let parcel = new Parcel(i, j, n, k);

          parcels.push(parcel);
        }
      }
    }
  }
}



