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
      if (closeSet.includes(neighbor) === false && neighbor.wall === false) {
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
    stroke(255, 0, 0, 5);
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

  for (let parcel of influencedParcels){
    for (let tile of parcel.tiles){
      fill(255, 0, 0,5);
      noStroke()
      rect(tile.i * res, tile.j * res, res, res);
    }
  }
}
