'use strict';

let MakeGraph = () => { 
  let graph = {};
  graph.contains = (node)=> {
    return !!graph[node.number];
  }
  graph.addStation = (node) => {  
    if(!graph.contains(node)){
      graph[node.number] = node;
    }
  }
  graph.addConnection = (startNode, endNode) => {
    if(graph.contains(startNode) && graph.contains(endNode)){
      graph[startNode.number].connects[endNode.number] = true;
      graph[endNode.number].connects[startNode.number] = true;
    }
  }
  return graph;
}

let railways = MakeGraph();
// Station needs index number, position on canvas and direction
// Direction is needed to calculate position for the next Station
function Station(number, position) {
  this.number = number;
  this.position = position;
  this.connects = {};
}

let counter = 1;
let line1 = [1, 2, 3, 4, 5];
let line2 = [6, 7, 2, 8, 9, 10, 11, 12];
let line3 = [13, 14, 3, 9, 15, 16];
line1.forEach((stationNumber, index) => {
  let newStation = new Station(stationNumber, [10 + counter * 10,  100 - counter * 15]);
  railways.addStation(newStation);
  if (counter !== 1) {
    railways.addConnection(railways[stationNumber], railways[line1[index-1]]);
  }
  counter++;
});
counter = 1;
line2.forEach((stationNumber, index) => {
  let newStation = new Station(stationNumber, [stationNumber * 10, 70]);
  railways.addStation(newStation);
  if (counter !== 1) {
    railways.addConnection(railways[stationNumber], railways[line2[index-1]]);
  }
  counter++;
});
counter = 1;
line3.forEach((stationNumber, index) => {
  let newStation = new Station(stationNumber, [10 + counter * 10, 10 + counter * 15]);
  railways.addStation(newStation);
  if (counter !== 1) {
    railways.addConnection(railways[stationNumber], railways[line3[index-1]]);
  }
  counter++;
});
console.log(railways);

// // implementing stack structure for trains
// function Train(numberOfStations, numberOfPassengers) {
//   this.stations = [];
//   this.numberOfStations = numberOfStations;
//   this.numberOfPassengers = numberOfPassengers;
//   this.direction = true;
//   // TODO: don't forget to change lastNode to true when adding first node
//   this.isFirstStation = isFirstStation;
//   this.isLastStation = isLastStation;
//   this.add = addStation;
//   this.pop = popStation;
//   this.peek = peek;

//   function addStation(station) {
//     this.stations.push(station);
//   }

//   function popStation() {
//     this.stations.pop();
//   }

//   function peek() {
//     return this.stations[this.stations.length - 1];
//   }

//   function isFirstStation() {
//     return this.stations.length === 1;
//   }

//   function isLastStation() {
//     return this.stations.length === this.numberOfStations;
//   }
// }

// // Station needs index number, position on canvas and direction
// // Direction is needed to calculate position for the next Station
// function Station(number, position, direction) {
//   this.number = number;
//   this.position = position;
//   this.direction = direction;
// }

// let train1 = new Train(5, 1);
// let train1Station1 = new Station(1, [0,0], [10, 0]);
// train1.add(train1Station1);

// function goToNextStation(trainObject) {
//   // Check train direction - should we add or pop stations?
//   // If true, we should check if current Station is not the last
//   // If it is last, change direction and call the same function again
//   // If not last, generate next Station and add it to the train
//   // If direction is false, we should check is it is the first Station
//   // If it is the first station, change direction and call function
//   // If it is not first station, pop the last station from the train
//   if (trainObject.direction) {
//     if (trainObject.isLastStation() ) {
//       trainObject.direction = !trainObject.direction;
//       goToNextStation(trainObject);
//     }
//     else {
//       let lastStation = trainObject.peek();
//       let nextStationPosition = [lastStation.position[0] + lastStation.direction[0], lastStation.position[1] + lastStation.direction[1]];
//       let nextStation = new Station( (lastStation.number+1), nextStationPosition, lastStation.direction);
//       trainObject.add(nextStation);
//       console.log(trainObject.peek());
//     }
//   }
//   else {
//     if (trainObject.isFirstStation()) {
//       trainObject.direction = !trainObject.direction;
//       goToNextStation(trainObject);
//     }
//     else {
//       trainObject.pop();
//       console.log(trainObject.peek());
//     }
//   }
// }

// let counter = 0;
// function go() {
//   console.log('Inside interval function')
//   if (counter < 15) {
//     counter++;
//     goToNextStation(train1);
//   }
// }
// let trainInterval = setInterval(go, 1000);
