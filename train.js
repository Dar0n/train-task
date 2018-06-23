'use strict';

// implementing stack structure for trains
function Train(numberOfStations) {
  this.stations = [];
  this.numberOfStations = numberOfStations;
  this.direction = true;
  // TODO: don't forget to change lastNode to true when adding first node
  this.lastNode = isLastNode;
  this.add = addStation;
  this.pop = popStation;
  this.peek = peek;

  function addStation(station) {
    this.stations.push(station);
  }

  function popStation() {
    this.stations.pop();
  }

  function peek() {
    return this.stations[this.stations.length - 1];
  }

  function isLastNode() {
    return this.stations.length === 1;
  }
}

