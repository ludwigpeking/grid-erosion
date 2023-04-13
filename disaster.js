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

function destoryParcelsLowProsper(){
    for (let i = 0; i < parcels.length; i++) {
        if(parcels[i].prosperity < 3 && 0.5 < Math.random()){
            parcels.splice(i, 1);
            //would the splice function change the index of the array and cause the loop to skip the next parcel? correct: no, because the loop will not run again until the next frame
        }
    }
    background(120)
    redrawTheParcelsProsperity()
    gridMap = creategridMap(parcels, cellSize)
    refreshTileProperty()

}
//all parcels' proserity value reduced by 50%
function destoryParcelsHalfProsper(){
    for (let i = 0; i < parcels.length; i++) {
        parcels[i].prosperity = parcels[i].prosperity * 0.5;
    }
    background(120)
    redrawTheParcelsProsperity()
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