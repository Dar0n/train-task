'use strict';

function goToNextStation(trainObject) {
  // Each line has a direction
  // If it is true, train is moving forward
  // Else it is moving backward
  if (trainObject.direction) {
    // On the last station train changes direction
    if (trainObject.currentStation === trainObject.lastStation) {
      trainObject.direction = !trainObject.direction;
      goToNextStation(trainObject);
    }
    else {
      trainObject.moveForward();
      console.log(`Train number ${trainObject.trainIndex} is now on station ${trainObject.currentStation.number}.`);
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
      console.log(`Train number ${trainObject.trainIndex} is now on station ${trainObject.currentStation.number}.`);
    }
  }
}

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
  }
}

function trainsAreOnTheSameStation(trains) {
  let onTheSameStation = [];
  for (let i = 0; i < trains.length; i++) {
    for (let j = i+1; j < trains.length; j++) {
      if (trains[i].currentStation.number === trains[j].currentStation.number) {
        onTheSameStation.push(trains[i]);
        onTheSameStation.push(trains[j]);
        console.log(`Train${i + 1} and train${j + 1} met on station ${trains[i].currentStation.number}`);
      }
    }
  }
  // return array of trains sorted by number of passengers
  return onTheSameStation.sort((train1, train2) => train2.numberOfPassengers - train1.numberOfPassengers);
}