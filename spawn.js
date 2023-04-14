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
    console.log(randomTile);
    randomTile.owner = new SpawnedParcel(randomTile.i, randomTile.j);
    randomTile.owner.color = color(0, 0, 255);
    parcels.push(randomTile.owner);
    randomTile.owner.accessPoint = randomTile;
    randomTile.owner.tiles.push(randomTile);
    randomTile.owner.streetFront = true;
    randomTile.owner.frontageIndex = 0;
    noStroke()
    fill(randomTile.owner.color)
    rect(randomTile.i *res, randomTile.j *res, res*2, res*2)
    console.log("spawned", randomTile.i, randomTile.j);
    parcels.push(randomTile.owner);

            // tile.owner = new Parcel(tile.i, tile.j);
            // tile.owner.color = color(0, 0, 255);
            // parcels.push(tile.owner);
            // tile.owner.accessPoint = tile;
            // tile.owner.tiles.push(tile);
            // tile.owner.streetFront = true;
            // tile.owner.frontageIndex = 0;
            // noStroke()
            // fill(tile.owner.color)
            // rect(tile.i *res, tile.j *res, res, res)
            // console.log("spawned", tile.i, tile.j);
          
        

    
}
