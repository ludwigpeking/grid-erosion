

function weightedRandom(arr, weightAttribute) {
  //weightedRandom
  let sumWeights = arr.reduce((acc, obj) => acc + obj[weightAttribute], 0);
  let randomWeight = Math.random() * sumWeights;
  let currentWeight = 0;

  for (const obj of arr) {
    currentWeight += obj[weightAttribute];
    if (randomWeight <= currentWeight) {
      return obj;
    }
  }
}


// Utility function to calculate the square of the Euclidean distance between two points
function squaredDistance(p1, p2) {
  const dx = p1.i - p2.i;
  const dy = p1.j - p2.j;
  return dx * dx + dy * dy;
}

// Create a gridMap for spatial partitioning
function creategridMap(parcels, cellSize) {
  gridMap = new Map();

  for (const parcel of parcels) {
    const cellI = Math.floor(parcel.accessPoint.i / cellSize);
    const cellJ = Math.floor(parcel.accessPoint.j / cellSize);
    const cellKey = `${cellI},${cellJ}`;

    if (!gridMap.has(cellKey)) {
      gridMap.set(cellKey, []);
    }

    gridMap.get(cellKey).push(parcel);
  }

  return gridMap;
}

// Find the influenced parcels using the gridMap
// Find the influenced parcels using the gridMap
function findInfluencedParcels(route, gridMap, D, cellSize) {
  const influencedParcels = new Set();
  const squaredD = D * D;

  for (const tile of route) {
    const minI = Math.floor((tile.i - D) / cellSize);
    const maxI = Math.floor((tile.i + D) / cellSize);
    const minJ = Math.floor((tile.j - D) / cellSize);
    const maxJ = Math.floor((tile.j + D) / cellSize);

    for (let i = minI; i <= maxI; i++) {
      for (let j = minJ; j <= maxJ; j++) {
        const cellKey = `${i},${j}`;

        if (gridMap.has(cellKey)) {
          for (const parcel of gridMap.get(cellKey)) {
            if (!influencedParcels.has(parcel) && squaredDistance(parcel.accessPoint, tile) <= squaredD) {
              influencedParcels.add(parcel);
              parcel.prosperity ++
            }
          }
        }
      }
    }
  }

  return Array.from(influencedParcels);
}



