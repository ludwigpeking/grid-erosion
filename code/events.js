function claimVacantParcel() {
  const vacantParcel = [];
  for (let parcel of parcels){
    if(parcel.claimed === false){
      vacantParcel.push(parcel);
    }
  }

  
}
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
    if(parcel.prosperity > random()*50){
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
  routes = [];
  redrawPark();
}

function showTraffic() {
  console.log("show traffic")
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
  redrawPark();
}


function destroyRandomParcels() {
    console.log("destroy random parcels", parcels.length)
  const numParcelsToDestroy = Math.floor(parcels.length * 0.2);
  for (let i = 0; i < numParcelsToDestroy; i++) {
    const randomIndex = Math.floor(Math.random() * parcels.length);
    parcels.splice(randomIndex, 1);
  }
  console.log(parcels.length);
  background(120)
  
  gridMap = creategridMap(parcels, cellSize)
  refreshTileOfRemovedParcels()
  redrawParcels();
  for (let route of routes){
    drawARoute(route);
}}

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
  refreshTileOfRemovedParcels()

}
//all parcels' proserity value reduced by 50%
function destoryParcelsHalfProsper(){
  for (let i = 0; i < parcels.length; i++) {
      parcels[i].prosperity = parcels[i].prosperity * 0.5;
  }
  background(120)
  redrawParcels()
  refreshTileOfRemovedParcels()
}

function refreshTileOfRemovedParcels(){
  for(const tile of tiles){
    
    if(!parcels.includes(tile.owner)){
      tile.streetFront = false;
      tile.accessPoint = false;
      tile.owner = openSpace;
      tile.wall = false;
      tile.onFence = false;
      tile.frontageIndex = 0;
      tile.color = color(120);
    }
    if (tile.park ==true){
      tile.owner = park;
      tile.streetFront = false;
      tile.accessPoint = false;
      tile.wall = true;
      tile.onFence = false;
      tile.frontageIndex = 0;
      tile.color = color(120, 255, 180);
    }
  }
}