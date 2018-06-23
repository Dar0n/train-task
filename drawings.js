'use strict';



function draw(ctx, trains) {
  let colors = ['green', 'red', 'blue'];
  let sizes = [15, 20, 10];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines(ctx, trains);
  drawStations(ctx, trains);
  drawTrains(ctx, trains, colors, sizes);
}

function drawLines(ctx, trains) {
  trains.forEach((train, index) => {
    let stations = train.getAllStations();
    for (let i = 0; i < stations.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(stations[i].position[0], stations[i].position[1]);
      ctx.lineTo(stations[i + 1].position[0], stations[i + 1].position[1])
      ctx.stroke();
    }
  });
}

function drawStations(ctx, trains) {
  trains.forEach((train, index) => {
    for (let station of train.getAllStations()) {
      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.moveTo(station.position[0], station.position[1]);
      ctx.arc(station.position[0], station.position[1], 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke
    }
  });
  
}

function drawTrains(ctx, trains, colors, sizes) {
  trains.forEach((train, index) => {
    for (let station of train.getAllStations()) {
      if (station === train.currentStation) {
        ctx.beginPath();
        ctx.fillStyle = colors[index];
        ctx.moveTo(station.position[0] + sizes[index], station.position[1]);
        ctx.arc(station.position[0], station.position[1], sizes[index], 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  })
}