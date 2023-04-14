//make UI to give users the access of the const streetCount = 15; const avenueCount = 12;const streetWidth = 4;const blockParcelCount = 5;// const parcelWidth = 3;// const parcelDepth = 4;// const res = 5; user can input numbers to boxes and the program will change the const streetCount = 15; const avenueCount = 12;const streetWidth = 4;const blockParcelCount = 5;// const parcelWidth = 3;// const parcelDepth = 4;// const res = 5; to the numbers that user inputed.
//once input, the program update and redraw the canvas, add titles and avoid the overlap of the canvas and the buttons.
function inputs(){
    input00 = createInput("streetCount");
    input00.position(0, height + 10);
    input00.size(80, 20);
    input00.input(updateStreetCount);
    input01 = createInput("avenueCount");
    input01.position(100, height +10);
    input01.size(80, 20);
    input01.input(updateAvenueCount);
    input02 = createInput("streetWidth");
    input02.position(200, height +10);
    input02.size(80, 20);
    input02.input(updateStreetWidth);
    input03 = createInput("blockParcelCount");
    input03.position(300, height +10);
    input03.size(80, 20);
    input03.input(updateBlockParcelCount);
    input04 = createInput("parcelWidth");
    input04.position(400, height +10);
    input04.size(80, 20);
    input04.input(updateParcelWidth);
    input05 = createInput("parcelDepth");
    input05.position(500, height +10);
    input05.size(80, 20);
    input05.input(updateParcelDepth);
    input06 = createInput("res");
    input06.position(600, height +10);
    input06.size(80, 20);
    input06.input(updateRes);
  }
function updateStreetCount(){
    streetCount = input00.value();
    console.log("streetCount: ",streetCount);
    setup();
}
function updateAvenueCount(){
    avenueCount = input01.value();
    console.log("avenueCount: ",avenueCount);
    setup();
}
function updateStreetWidth(){
    streetWidth = input02.value();
    console.log("streetWidth: ",streetWidth);
    setup();
}
function updateBlockParcelCount(){
    blockParcelCount = input03.value();
    console.log("blockParcelCount: ",blockParcelCount);
    setup();
}
function updateParcelWidth(){
    parcelWidth = input04.value();
    console.log("parcelWidth: ",parcelWidth);
    setup();
}
function updateParcelDepth(){
    parcelDepth = input05.value();
    console.log("parcelDepth: ",parcelDepth);
    setup();
}
function updateRes(){
    res = input06.value();
    console.log("res: ",res);
    setup();
}

function buttons(){
    button00 = createButton("1 Path!");
    button00.position(0, height + 10);
    button00.mousePressed(generatRandomTraffic);
    button01 = createButton("100 Path!");
    button01.position(100, height +10);
    button01.mousePressed(generatRandomTraffic100);
    button02 = createButton("1000 Path!");
    button02.position(200, height +10);
    button02.mousePressed(generatRandomTraffic1000);
    button10 = createButton("redraw parcel prosperity");
    button10.position(0, height +40);
    button10.mousePressed(redrawTheParcelsProsperity);
    button11 = createButton("Destroy some parcels");
    button11.position(200, height +40);
    button11.mousePressed(destroyRandomParcels);
    button12 = createButton("Destroy low prosperity parcels");
    button12.position(400, height +40);
    button12.mousePressed( destoryParcelsLowProsper );
    button13 = createButton("Reduce prosperity of all parcels by 50%");
    button13.position(600, height +40);
    button13.mousePressed( destoryParcelsHalfProsper );
    button20 = createButton("Spawn a parcel");
    button20.position(0, height +70);
    button20.mousePressed(spawnOneParcel);
  }


function buttons(){
 //correct button locations above, not to overlap with the inputs
    button00 = createButton("1 Path!");
    button00.position(0, height + 110);
    button00.mousePressed(generatRandomTraffic);
    button01 = createButton("100 Path!");
    button01.position(100, height +110);
    button01.mousePressed(generatRandomTraffic100);
    button02 = createButton("1000 Path!");
    button02.position(200, height +110);
    button02.mousePressed(generatRandomTraffic1000);
    button10 = createButton("redraw parcel prosperity");
    button10.position(0, height +140);
    button10.mousePressed(redrawTheParcelsProsperity);
    button11 = createButton("Destroy some parcels");
    button11.position(200, height +140);
    button11.mousePressed(destroyRandomParcels);
    button12 = createButton("Destroy low prosperity parcels");
    button12.position(400, height +140);
    button12.mousePressed( destoryParcelsLowProsper );
    button13 = createButton("Reduce prosperity of all parcels by 50%");
    button13.position(600, height +140);
    button13.mousePressed( destoryParcelsHalfProsper );
    button20 = createButton("Spawn a parcel");
    button20.position(0, height +170);
    button20.mousePressed(spawnOneParcel);
   
    

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

function generatRandomTraffic100() {
    for(let i = 0 ; i<100; i++)generatRandomTraffic()
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
//remove Buttons and inputs if there are. if undifined, do nothing
function removeButtonsAndInputsIfThereAre(){
    if(typeof button00 !== "undefined")button00.remove();
    if(typeof button01 !== "undefined")button01.remove();
    if(typeof button02 !== "undefined")button02.remove();
    if(typeof button10 !== "undefined")button10.remove();
    if(typeof button11 !== "undefined")button11.remove();
    if(typeof button12 !== "undefined")button12.remove();
    if(typeof button13 !== "undefined")button13.remove();
    if(typeof button20 !== "undefined")button20.remove();
    if(typeof input00 !== "undefined")input00.remove();
    if(typeof input01 !== "undefined")input01.remove();
    if(typeof input02 !== "undefined")input02.remove();
    if(typeof input03 !== "undefined")input03.remove();
    if(typeof input04 !== "undefined")input04.remove();
    if(typeof input05 !== "undefined")input05.remove();
    if(typeof input06 !== "undefined")input06.remove();
    
}