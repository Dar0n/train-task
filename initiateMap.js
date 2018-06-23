'use strict';

function initiateMap() {
  let trains = generateLines();
  let trainInterval;
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

  function initiateInterval (interval) {
    if (!trainsAreMoving) {
      trainInterval = setInterval(go, interval);
      trainsAreMoving = true;
    }
  }

  function cancelInterval() {
    clearInterval(trainInterval);
    trainsAreMoving = false;
  }
  
  function go() {
    if (true) {
      moveTrains(trains);
      draw(ctx, trains);
    }
  }
  // Draw map for the first time, until the movement starts
  draw(ctx, trains);
}
