
let needUpdate = false;
let buttonList = [];
let inputElements = []; 
let labelElements = []; 


let sceneSelect;
const params = [
    {name: 'streetCount', type: 'int'},
    {name: 'avenueCount', type: 'int'},
    {name: 'streetWidth', type: 'int'},
    {name: 'blockParcelCount', type: 'int'},
    {name: 'parcelWidth', type: 'int'},
    {name: 'parcelDepth', type: 'int'},
    {name: 'res', type: 'int'}
];

function resetParameters() {
    streetCount = 9;
    avenueCount = 5;
    streetWidth = 4;
    blockParcelCount = 5;
    parcelWidth = 3;
    parcelDepth = 5;
    res = 5;
    needUpdate = true; 
    console.log('Parameters reset to default');
}

function inputs() {
    inputElements.forEach(input => input.remove());
    labelElements.forEach(label => label.remove());
    inputElements = [];
    labelElements = [];

    const sceneSelect = createSelect();
    sceneSelect.position(params.length * 100, height + 30); // Adjust position as needed
    for (const scene in scenes) {
        sceneSelect.option(scene);
    }
    sceneSelect.changed(() => changeScene(sceneSelect.value()));
    inputElements.push(sceneSelect); // To ensure it gets removed and updated like other inputs


    inputElements = params.map((param, index) => {
        const label = createElement('label', capitalizeFirstLetter(param.name) )
            .position(index * 100, height + 10)
            .style('font-size', '12px');
        
        labelElements.push(label);  // Store label elements to update them later

        const input = createInput('')
            .value(getDefaultValue(param.name))
            .position(index * 100, height + 30)
            .size(87, 20);

        if (param.type === 'int') {
            input.attribute('type', 'number')
                .attribute('step', '1');
        }

        input.changed(() => {
            updateParameter(param.name, input.value(), param.type);
        });

        return input;
    });
}


function getDefaultValue(paramName) {
    switch (paramName) {
        case 'streetCount': return streetCount;
        case 'avenueCount': return avenueCount;
        case 'streetWidth': return streetWidth;
        case 'blockParcelCount': return blockParcelCount;
        case 'parcelWidth': return parcelWidth;
        case 'parcelDepth': return parcelDepth;
        case 'res': return res;
        default: return '';
    }
}

function createNumberInput(paramName) {
    const input = createInput('');
    input.attribute('type', 'number');
    input.attribute('step', '1'); // Increment by 1
    input.value(window[paramName]); // Set the default value
    return input;
}

function updateParameter(paramName, value, type) {
    if (type === 'int') {
        value = parseInt(value);
    }

    if (paramName === 'streetCount') streetCount = value;
    if (paramName === 'avenueCount') avenueCount = value;
    if (paramName === 'streetWidth') streetWidth = value;
    if (paramName === 'blockParcelCount') blockParcelCount = value;
    if (paramName === 'parcelWidth') parcelWidth = value;
    if (paramName === 'parcelDepth') parcelDepth = value;
    if (paramName === 'res') res = value;

    console.log(paramName + ": ", value);
    needUpdate = true;

    // Update the label with the new value
    const labelIndex = params.findIndex(param => param.name === paramName);
    if (labelIndex !== -1) {
        labelElements[labelIndex].html(capitalizeFirstLetter(paramName) + ': ' + value);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function buttons() {
    const buttonHeight = 40;
    const buttonLineHeight = 45;
    const buttonWidth = 150;
    const buttonData = [
        { label: '1 Path!', gridPosition: {i: 0, j: 0}, mousePressed: generateRandomTraffic },
        { label: '100 Path!', gridPosition: {i: 1, j: 0}, mousePressed: generateRandomTraffic100 },
        { label: '1000 Path!', gridPosition: {i: 2, j: 0}, mousePressed: generateRandomTraffic1000 },
        { label: 'redraw parcel prosperity', gridPosition: {i: 0, j: 1}, mousePressed: redrawTheParcelsProsperity },
        { label: 'Destroy random parcels', gridPosition: {i: 1, j: 1}, mousePressed: destroyRandomParcels },
        { label: 'Destroy low prosperity parcels', gridPosition: {i: 2, j: 1}, mousePressed: destoryParcelsLowProsper },
        { label: 'Reduce prosperity of all parcels by 50%', gridPosition: {i: 3, j: 1}, mousePressed: destoryParcelsHalfProsper },
        { label: 'Spawn a parcel', gridPosition: {i: 0, j: 2}, mousePressed: spawnOneParcel },
        { label: 'Claim a tile', gridPosition: {i: 1, j: 2}, mousePressed: parcelClaimOneTile },
        { label: 'traffic decline', gridPosition: {i: 2, j: 2}, mousePressed: trafficDecline },
        { label: 'show traffic', gridPosition: {i: 3, j: 2}, mousePressed: showTraffic },
        { label: 'Traffic Clear', gridPosition: {i: 3, j: 0}, mousePressed: trafficClear },
        { label: 'Reset to Default Parameters', gridPosition: {i: 0, j: 3}, mousePressed: resetParameters }
    ];
    

    buttonData.forEach((button) => {
        const x = button.gridPosition.i * buttonWidth;
        const y = height + 60 + button.gridPosition.j * buttonLineHeight; // Adjust the base y-position as needed

        const btn = createButton(button.label);
        btn.position(x, y);
        btn.size(buttonWidth - 5, buttonHeight); // -5 for some padding
        btn.mousePressed(button.mousePressed);
        buttonList.push(btn); 
    });
}


function generateRandomTraffic() {
    let start = weightedRandom(parcels, "prosperity").accessPoint;
    let end = weightedRandom(parcels, "prosperity").accessPoint;
    fill(255, 0, 0);
    rect(start.i * res, start.j * res, res, res);
    rect(end.i * res, end.j * res, res, res);
    pathfindingKnightMove(start, end);
}
function generateRandomTraffic1000() {
    for(let i = 0 ; i<1000; i++)generateRandomTraffic()
}

function generateRandomTraffic100() {
    for(let i = 0 ; i<100; i++)generateRandomTraffic()
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
//remove Buttons and inputs when updating parameters
function removeButtonsAndInputsIfThereAre(){
    for (let btn of buttonList) {
        btn.remove();
    }
    buttonList = [];  // Clear the button list

    for (let input of inputElements) {
        input.remove();
    }
    inputElements = [];  // Clear the input list
}

function changeScene(sceneName) {
    const scene = scenes[sceneName];
    if (scene) {
        streetCount = scene.streetCount;
        avenueCount = scene.avenueCount;
        streetWidth = scene.streetWidth;
        blockParcelCount = scene.blockParcelCount;
        parcelWidth = scene.parcelWidth;
        parcelDepth = scene.parcelDepth;
        res = scene.res;
        needUpdate = true;
        console.log(`Switched to ${sceneName} scene`);
    } else {
        console.log(`Scene ${sceneName} not found`);
    }
}
