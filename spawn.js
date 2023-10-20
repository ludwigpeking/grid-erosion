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
