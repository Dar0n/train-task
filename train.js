'use strict';

let trains = generateLines();
let timer = 0;
let colors = ['green', 'red', 'blue'];
let sizes = [15, 20, 10];
let starter = document.getElementById('start');
let stoper = document.getElementById('stop');
let trainInterval;

starter.addEventListener('click', () => {
  trainInterval = setInterval(go, 1000);
})

stoper.addEventListener('click', () => {
  console.log('stopping!');
  clearInterval(trainInterval);
})

function go() {
  if (true) {
    moveTrains(trains);
    draw(trains);
    console.log('-------------');
  }
}


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

function drawLines(trains) {
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

function drawStations(trains) {
  trains.forEach((train, index) => {
    for (let station of train.getAllStations()) {
      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.moveTo(station.position[0], station.position[1]);
      ctx.arc(station.position[0], station.position[1], 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke
    }
    // while (runner.next !== null) {
    //   ctx.beginPath();
    //   if (runner === train.currentStation) {
    //     console.log(train.currentStation.number);
    //     ctx.fillStyle = colors[index];
    //   }
    //   else {
    //     ctx.fillStyle = 'yellow';
    //   }
    //   let start = runner.position;
    //   let end = runner.next.position;
    //   ctx.moveTo(start[0] + 10, start[1]);
    //   ctx.arc(start[0], start[1], 10, 0, 2*Math.PI);
    //   ctx.fill();
    //   runner = runner.next;
    //   ctx.stroke();
    // }
    // ctx.beginPath();
    // ctx.moveTo(train.lastStation.position[0] + 10, train.lastStation.position[1]);
    // ctx.arc(train.lastStation.position[0], train.lastStation.position[1], 10, 0, 2*Math.PI);
    // ctx.fill();
  });
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
draw(trains);
function draw(trains) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines(trains);
  drawStations(trains);
}
