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