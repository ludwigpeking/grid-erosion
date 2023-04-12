function destroyRandomParcels() {
    console.log(parcels);
    const numParcelsToDestroy = Math.floor(parcels.length * 0.2);
    for (let i = 0; i < numParcelsToDestroy; i++) {
      const randomIndex = Math.floor(Math.random() * parcels.length);
      parcels.splice(randomIndex, 1);
    }
    background(120)
    redrawTheParcelsProsperity()
    gridMap = creategridMap(parcels, cellSize)
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