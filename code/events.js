//scenes
const scenes = {
  newYork : {
    streetCount: 20,
    avenueCount: 7,
    streetWidth: 4,
    blockParcelCount: 8,
    parcelWidth: 3,
    parcelDepth: 5,
    res: 5,
    needUpdate: true,
    parkEdges: [1/3,0, 2/3,0, 0,0, 1/3,0],
    squareEdges: [0,0,0,0,0,0,0,0],
    broadway: [[1/3,0],[1/3,0],[2/3,0],[1,0]],
   
    events: {},
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
    parkEdges: [2/3,0, 2/3,1, ,0,0, 1,0],
    squareEdges: [1/2,-1,1/2,0,1/2,-1,1/2,0],
    events: {},
  },
  lucca : {
}
}



// Calculate parkAvenueStart, parkAvenueEnd, parkStreetStart, and parkStreetEnd
scenes.newYork.parkAvenueStart = Math.floor(newYork.avenueCount / 3);
scenes.newYork.parkAvenueEnd = Math.ceil(newYork.avenueCount / 3 * 2);
scenes.newYork.parkStreetStart = Math.floor(newYork.streetCount / 3);
scenes.newYork.parkStreetEnd = newYork.streetCount;

// Calculate Broadway
newYork.broadway = [
    [newYork.parkAvenueEnd, newYork.parkStreetStart],
    [0, 0]
];

portland.parkAvenueStart = Math.floor(portland.avenueCount / 3*2);
portland.parkAvenueEnd = Math.floor(portland.avenueCount / 3*2) +1;
portland.parkStreetStart = 0;
portland.parkStreetEnd = portland.streetCount;

portland.square = [ Math.floor(portland.avenueCount/2),  Math.floor(portland.streetCount/2),1,1];



// const scatter ={};
// const erosion = {};

// const cityEvents = 
// [
//     "layout",
//     "grow",
//     "decline",
//     "vacancy",
//     "claim"
// ]

// function resetParameters() {
//     streetCount = 9;
//     avenueCount = 5;
//     streetWidth = 4;
//     blockParcelCount = 5;
//     parcelWidth = 3;
//     parcelDepth = 5;
//     res = 5;
//     needUpdate = true; 
//     console.log('Parameters reset to default');
// }

//spawn a parcel on a random vacant tile belong to the open space, where tile's traffic value is smaller than 2
function spawnOneParcel(){
    let vacantTiles = [];
    for(const tile of tiles){
        if(tile.owner == openSpace && tile.traffic < 2){
            vacantTiles.push(tile);
        }
    }
    //pick a random tile from the vacant tiles
    let randomTile = vacantTiles[Math.floor(Math.random() * vacantTiles.length)];
    randomTile.owner = new SpawnedParcel(randomTile.i, randomTile.j);
    parcels.push(randomTile.owner);
    randomTile.owner.show()
    randomTile.owner.tiles.push(randomTile);
    randomTile.streetFront = true;
    randomTile.frontageIndex = 0;

}

function parcelClaimOneTile() {
  for (let parcel of parcels) {
    if(parcel.prosperity > random()*100){
      parcel.claimOneTile();
    }
    
  }
}

function trafficDecline() {
  // reduce tiles' traffic value by 1
  for (let tile of tiles) {
      if (tile.owner == openSpace) {
          fill(120)
          noStroke()
          rect(tile.i * res, tile.j * res, res, res)

          if (tile.traffic > 0) {
              tile.traffic = max(tile.traffic -1, 0);
          }
          fill(255, 0, 0, tile.traffic * 50)
          noStroke()
          rect(tile.i * res, tile.j * res, res, res)
      }   
  }
}

function trafficClear(){
  for (let tile of tiles) {
      tile.traffic = 0;
      if (tile.owner == openSpace) {
          fill(120)
          noStroke()
          rect(tile.i * res, tile.j * res, res, res)
      }
  }
}

function showTraffic() {
  for (let tile of tiles) {
      if (tile.owner == openSpace) {
      //background color fill the tile
      fill(120)
      noStroke()
      rect(tile.i * res, tile.j * res, res, res)

      fill(255, 0, 0, tile.traffic * 50)
      noStroke()
      rect(tile.i * res, tile.j * res, res, res)
      }
  }
}

function destroyRandomParcels() {
    
  const numParcelsToDestroy = Math.floor(parcels.length * 0.2);
  for (let i = 0; i < numParcelsToDestroy; i++) {
    const randomIndex = Math.floor(Math.random() * parcels.length);
    parcels.splice(randomIndex, 1);
  }
  background(120)
  redrawParcels();
  gridMap = creategridMap(parcels, cellSize)
  refreshTileProperty()
}

function destoryParcelsLowProsper(){
  for (let i = 0; i < parcels.length; i++) {
      if(parcels[i].prosperity  * 0.1 < Math.random()){
          parcels.splice(i, 1);
          //would the splice function change the index of the array and cause the loop to skip the next parcel? correct: no, because the loop will not run again until the next frame
      }
  }
  background(120)
  redrawParcels()
  gridMap = creategridMap(parcels, cellSize)
  refreshTileProperty()

}
//all parcels' proserity value reduced by 50%
function destoryParcelsHalfProsper(){
  for (let i = 0; i < parcels.length; i++) {
      parcels[i].prosperity = parcels[i].prosperity * 0.5;
  }
  background(120)
  redrawParcels()
  refreshTileProperty()
}

function refreshTileProperty(){
  for(const tile of tiles){
      if(!parcels.includes(tile.owner)){
          tile.streetFront = false;
          tile.accessPoint = false;
          tile.owner = openSpace;
          tile.wall = false;
          tile.frontageIndex = 0;
          tile.color = openSpace.color;
      }
  }
}

function destroyRandomParcels() {
    
  const numParcelsToDestroy = Math.floor(parcels.length * 0.2);
  for (let i = 0; i < numParcelsToDestroy; i++) {
    const randomIndex = Math.floor(Math.random() * parcels.length);
    parcels.splice(randomIndex, 1);
  }
  background(120)
  redrawParcels();
  gridMap = creategridMap(parcels, cellSize)
  refreshTileProperty()
}

function destoryParcelsLowProsper(){
  for (let i = 0; i < parcels.length; i++) {
      if(parcels[i].prosperity  * 0.1 < Math.random()){
          parcels.splice(i, 1);
          //would the splice function change the index of the array and cause the loop to skip the next parcel? correct: no, because the loop will not run again until the next frame
      }
  }
  background(120)
  redrawParcels()
  gridMap = creategridMap(parcels, cellSize)
  refreshTileProperty()

}
//all parcels' proserity value reduced by 50%
function destoryParcelsHalfProsper(){
  for (let i = 0; i < parcels.length; i++) {
      parcels[i].prosperity = parcels[i].prosperity * 0.5;
  }
  background(120)
  redrawParcels()
  refreshTileProperty()
}

function refreshTileProperty(){
  for(const tile of tiles){
      if(!parcels.includes(tile.owner)){
          tile.streetFront = false;
          tile.accessPoint = false;
          tile.owner = openSpace;
          tile.wall = false;
          tile.frontageIndex = 0;
          tile.color = openSpace.color;
      }
  }
}