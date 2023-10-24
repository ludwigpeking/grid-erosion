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

let routes = [];
let routesNr = 0;

function pathfindingKnightMove(start, end) {
  let closeSet = [];
  tileReset();
  start.g = 0;
  let openSet = [];
  openSet.push(start);
  let current = start;
  let route = [];

  while (current != end) {
      if (openSet.length === 0) {
          console.log("No valid path found");
          return;
      }
      openSet.sort((a, b) => (a.f > b.f ? 1 : -1));
      current = openSet[0];
      closeSet.push(current);
      openSet.splice(0, 1);
      let neighbors = current.neighbors.slice();
      let knightMoves = [
          {i: 2, j: 1},
          {i: 1, j: 2},
          {i: -2, j: -1},
          {i: -1, j: -2},
          {i: 2, j: -1},
          {i: 1, j: -2},
          {i: -2, j: 1},
          {i: -1, j: 2},
      ];

      for (let move of knightMoves) {
        let ni = current.i + move.i;
        let nj = current.j + move.j;
  
        if (ni >= 0 && nj >= 0 && ni < cols && nj < rows) {
          neighbors.push(grid[ni][nj]);
        }
      }

      for (let neighbor of neighbors) {
        if (closeSet.includes(neighbor) === false && neighbor.wall === false &&
            !isWallInBetween(current, neighbor)) {
          
          neighbor.h = dist(neighbor.i, neighbor.j, end.i, end.j);
          let g = current.g + dist(neighbor.i, neighbor.j, current.i, current.j);
  
                  if (g < neighbor.g) {
                      neighbor.from = current;
                      neighbor.g = g;
                      neighbor.f = neighbor.g + neighbor.h;
                  }

                  if (openSet.includes(neighbor) == false) {
                      openSet.push(neighbor);
                  }
              }
          }
      }
    if (current == end) {

    let previous = end;

    while (previous.from != null) {
      route.push(previous);
      previous = previous.from;
      previous.traffic++;
    }
    route.push(start);
    routes.push(route);

    colorMode(RGB);
    beginShape();
    noFill();

    strokeWeight(res / 2);
    stroke(255, 0, 0, 50);
    // stroke(255,100)
    vertex(route[0].x, route[0].y);
    for (let step = 0; step < route.length; step++) {
      curveVertex(route[step].x, route[step].y);
    }

    vertex(route[route.length - 1].x, route[route.length - 1].y);
    endShape();
  }
  routesNr++;

  gridMap = creategridMap(parcels, cellSize);
  const influencedParcels = findInfluencedParcels(route, gridMap, D, cellSize);
}

function isWallInBetween(tile1, tile2) {
  // If it is a knight move
  if ((Math.abs(tile1.i - tile2.i) === 2 && Math.abs(tile1.j - tile2.j) === 1) ||
      (Math.abs(tile1.i - tile2.i) === 1 && Math.abs(tile1.j - tile2.j) === 2)) {

      // Check for walls in the middle squares that could block the knight move
      const orthogonal1 = grid[tile1.i][tile2.j];
      const orthogonal2 = grid[tile2.i][tile1.j];
      return (orthogonal1?.wall || orthogonal2?.wall) ||
             (grid[tile1.i][Math.floor((tile1.j + tile2.j) / 2)]?.wall ||
              grid[Math.floor((tile1.i + tile2.i) / 2)][tile1.j]?.wall ||
              grid[Math.floor((tile1.i + tile2.i) / 2)][tile2.j]?.wall);
  }

  // If it is a diagonal move
  if (Math.abs(tile1.i - tile2.i) === 1 && Math.abs(tile1.j - tile2.j) === 1) {
      return grid[tile1.i][tile2.j]?.wall || grid[tile2.i][tile1.j]?.wall;
  }

  return false;
}



function isDiagonalMove(tile1, tile2) {
  return Math.abs(tile1.i - tile2.i) === 1 && Math.abs(tile1.j - tile2.j) === 1;
}

function isWallInBetweenDiagonal(tile1, tile2) {
  return grid[tile1.i][tile2.j].wall || grid[tile2.i][tile1.j].wall;
}

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

