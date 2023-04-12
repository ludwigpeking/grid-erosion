function buttons(){
    button00 = createButton("1 Path!");
    button00.position(0, height + 10);
    button00.mousePressed(generatRandomTraffic);
    button01 = createButton("1000 Path!");
    button01.position(100, height +10);
    button01.mousePressed(generatRandomTraffic1000);
    button10 = createButton("redraw parcel prosperity");
    button10.position(0, height +40);
    button10.mousePressed(redrawTheParcelsProsperity);
    button11 = createButton("Destroy some parcels");
    button11.position(200, height +40);
    button11.mousePressed(destroyRandomParcels);
  }


function generatRandomTraffic() {
    let start = weightedRandom(parcels, "prosperity").accessPoint;
    let end = weightedRandom(parcels, "prosperity").accessPoint;
    fill(255, 0, 0);
    rect(start.i * res, start.j * res, res, res);
    rect(end.i * res, end.j * res, res, res);
    pathFinding(start, end);
}
function generatRandomTraffic1000() {
    for(let i = 0 ; i<1000; i++)generatRandomTraffic()
}

function redrawTheParcelsProsperity(){
    for(const parcel of parcels){
        for(const tile of parcel.tiles){
            fill(255,255-parcel.prosperity * 5,255-parcel.prosperity*5);
            noStroke();
            rect(tile.i * res, tile.j * res, res, res)
        }
    }
}