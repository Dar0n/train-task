'use strict';

function initiateMap() {
  let trains = generateLines();
  let trainInterval;
  // Keep state of the trains movement for clearing intervals
  let trainsAreMoving = false;
  let step = 1000;
  let startButton = document.getElementById('start');
  let stopButton = document.getElementById('stop');
  let fasterButton = document.getElementById('faster');
  let slowerButton = document.getElementById('slower');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 550;
  canvas.height = 600;
    
  function runApp() {
    moveTrains(trains);
    draw(ctx, trains);
  }

  function initiateInterval (interval) {
    if (!trainsAreMoving) {
      trainInterval = setInterval(runApp, interval);
      trainsAreMoving = true;
    }
  }

  function cancelInterval() {
    clearInterval(trainInterval);
    trainsAreMoving = false;
  }

  startButton.addEventListener('click', () => {
    initiateInterval(step);
  });
  
  stopButton.addEventListener('click', () => {
    cancelInterval();
  })

  fasterButton.addEventListener('click', () => {
    if (trainsAreMoving) {
      cancelInterval();
      if (step >100) {
        step -= 100;
      }
      initiateInterval(step);
    }
  })

  slowerButton.addEventListener('click', () => {
    if (trainsAreMoving) {
      cancelInterval();
      if (step <2000) {
        step += 100;
      }
      initiateInterval(step);
    }
  })

  // Draw map for the first time, before the movement starts
  draw(ctx, trains);
}
