'use strict';

// implementing doubly-linked list structure for railway
// Index corresponds to both line and train indices
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
  this.getAllStations = getAllStations
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

  function getAllStations() {
    let result = [];
    let runner = this.firstStation;
    while (runner !== null) {
      result.push(runner);
      runner = runner.next;
    }
    return result;
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

// Station needs index number, position on canvas
function Station(number, position) {
  this.number = number;
  this.position = position;
  this.next = null;
  this.prev = null;
}
