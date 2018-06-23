'use strict';

// Move each of the trains depending on its position
function moveTrains (trains) {
  // Check if there are trains on the same station
  let trainsMet = trainsAreOnTheSameStation(trains);
  if (!trainsMet.length) {
    trains.forEach(train => {
      goToNextStation(train);
    });
  }
  else {
    // Move all the trains that are not on the same station with any other
    trains.forEach(train => {
      if (trainsMet.indexOf(train) < 0) {
        goToNextStation(train);
      }
    });
    //move only first train from those that met
    goToNextStation(trainsMet[0]);
    let logs = document.getElementById('logs');
    let newP = document.createElement('p');
    newP.textContent = `Train ${trainsMet[1].trainIndex} has to stay on ${trainsMet[1].currentStation.number} station\n`;
    logs.appendChild(newP);
    logs.scrollTop = logs.scrollHeight;
  }
}

function trainsAreOnTheSameStation(trains) {
  let onTheSameStation = [];
  for (let i = 0; i < trains.length; i++) {
    for (let j = i+1; j < trains.length; j++) {
      if (trains[i].currentStation.number === trains[j].currentStation.number) {
        onTheSameStation.push(trains[i]);
        onTheSameStation.push(trains[j]);
      }
    }
  }
  // return array of trains sorted by number of passengers
  return onTheSameStation.sort((train1, train2) => train2.numberOfPassengers - train1.numberOfPassengers);
}

function goToNextStation(trainObject) {
  // Each line has a direction
  // If direction is true, train is moving forward
  // Else it is moving backward
  if (trainObject.direction) {
    // On the last station train changes direction
    if (trainObject.currentStation === trainObject.lastStation) {
      trainObject.direction = !trainObject.direction;
      goToNextStation(trainObject);
    }
    else {
      trainObject.moveForward();
    }
  }
  else {
    // On the first station train changes direction
    if (trainObject.currentStation === trainObject.firstStation) {
      trainObject.direction = !trainObject.direction;
      goToNextStation(trainObject);
    }
    else {
      trainObject.moveBackward();
    }
  }
}
