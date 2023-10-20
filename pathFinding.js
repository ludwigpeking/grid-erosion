let routes = [];
let routesNr = 0;


function pathFinding(start, end) {
  //reset grid......
  let closeSet = [];
  tileReset();
  //.g is the cost from start, .h is the heuristic future guessed cost
  start.g = 0;
  let openSet = [];
  openSet.push(start);
  let current = start;
  let route = [];
  //loop.............
  while (current != end) {
    if (openSet.length === 0) {
      console.log("No valid path found");
      return;
    }
    openSet.sort((a, b) => (a.f > b.f ? 1 : -1));
    current = openSet[0];
    closeSet.push(current);
    openSet.splice(0, 1);

    for (let neighbor of current.neighbors) {
      if (closeSet.includes(neighbor) === false && neighbor.wall === false && 
          !(isDiagonalMove(current, neighbor) && isWallInBetweenDiagonal(current, neighbor))) {

          neighbor.h = dist(neighbor.i, neighbor.j, end.i, end.j);
          let g = current.g + dist(neighbor.i, neighbor.j, current.i, current.j);

        if (g < neighbor.g) {
          neighbor.from = current;
          neighbor.g = g;
          neighbor.f = neighbor.g + neighbor.h;
          // noFill()
          // stroke(0,50)
          // line(neighbor.i*res + res/2, neighbor.j*res+ res/2, current.i*res+ res/2, current.j*res+ res/2)
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

  // for (let parcel of influencedParcels){
  //   for (let tile of parcel.tiles){
  //     fill(255, 0, 0,5);
  //     noStroke()
  //     rect(tile.i * res, tile.j * res, res, res);
  //   }
  // }
}


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