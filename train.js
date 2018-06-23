'use strict';

// Station needs index number, position on canvas and direction
// Direction is needed to calculate position for the next Station
function Station(number, position) {
  this.number = number;
  this.position = position;
  this.next = null;
  this.prev = null;
  // this.connects = {};
}

let counter = 1;
let line1 = [1, 2, 3, 4, 5];
let line2 = [6, 7, 2, 8, 9, 10, 11, 12];
let line3 = [13, 14, 3, 9, 15, 16];

// implementing doubly-linked list structure for trains
function Line(index, numberOfPassengers) {
  this.trainIndex = index;
  this.numberOfPassengers = numberOfPassengers;
  this.direction = true;
  this.firstStation = null;
  this.lastStation = null;
  this.currentStation = null;
  this.add = addStation;
  this.moveForward = moveForward;
  this.moveBackward = moveBackward;
  this.showLine = showLine;

  function addStation(station) {
    if (this.firstStation === null) {
      this.firstStation = station;
      this.lastStation = station;
      this.currentStation = station;
    }
    else {
      this.lastStation.next = station;
      station.prev = this.lastStation;
      this.lastStation = station;
    }
  }

  function moveForward() {
    if (this.currentStation !== this.lastStation){
      this.currentStation = this.currentStation.next;
    }
  }

  function moveBackward() {
    if (this.currentStation !== this.firstStation){
      this.currentStation = this.currentStation.prev;
    }
  }

  function showLine() {
    let runner = this.firstStation;
    let result = ''
    while (runner.next !== null) {
      result += runner.number + ' -> ';
      runner = runner.next;
    }
    result += runner.number;
    return result;
  }
}

let train1 = new Line(1, 50);
let train2 = new Line(2, 100);
let train3 = new Line(3, 10);
for (let stationNumber of line1) {
  let newStation = new Station(stationNumber, [10 + counter * 10,  100 - counter * 15]);
  train1.add(newStation);
  counter++;
};
counter = 1;
for (let stationNumber of line2) {
  let newStation = new Station(stationNumber, [stationNumber * 10, 70]);
  train2.add(newStation);
  counter++;
};
counter = 1;
for (let stationNumber of line3) {
  let newStation = new Station(stationNumber, [10 + counter * 10, 10 + counter * 15]);
  train3.add(newStation);
  counter++;
};
console.log(train1.showLine());
console.log(train2.showLine());
console.log(train3.showLine());

function goToNextStation(trainObject) {
  // Check train direction
  // If true, we should check if current Station is not the last
  // If it is last, change direction and call the same function again
  // If not last, move forward
  // If direction is false, we should check if it is the first Station
  // If it is the first station, change direction and call function
  // If it is not first station, move backword
  if (trainObject.direction) {
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

function moveTrains (trains) {
  let trainsMet = trainsAreOnTheSameStation(trains);
  if (!trainsMet.length) {
    trains.forEach(train => {
      goToNextStation(train);
    });
  }
  else {
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
        console.log(`Train${i + 1} and train${j + 1} collapsed`);
      }
    }
  }
  // return array of trains sorted by number of passengers
  return onTheSameStation.sort((train1, train2) => train2.numberOfPassengers - train1.numberOfPassengers);
}

let timer = 0;
function go() {
  if (timer < 15) {
    timer++;
    moveTrains([train1, train2, train3]);
    console.log('-------------');
  }
}
let trainInterval = setInterval(go, 1000);
