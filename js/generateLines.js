'user strict';

function generateLines() {
  // Line arrays contains indices of stations
  let counter = 1;
  let line1 = [1, 2, 3, 4, 5];
  let line2 = [6, 7, 2, 8, 9, 10, 11, 12];
  let line3 = [13, 14, 3, 9, 15, 16];

  // Each train is 'represented' by currentStation property on Line object
  let train1 = new Line(1, 50);
  let train2 = new Line(2, 100);
  let train3 = new Line(3, 10);
  for (let stationNumber of line1) {
    let newStation = new Station(stationNumber, [50 + counter * 50,  500 - counter * 75]);
    train1.add(newStation);
    counter++;
  };
  counter = 1;
  for (let stationNumber of line2) {
    let newStation = new Station(stationNumber, [counter * 50, 350]);
    train2.add(newStation);
    counter++;
  };
  counter = 1;
  for (let stationNumber of line3) {
    let newStation = new Station(stationNumber, [50 + counter * 50, 50 + counter * 75]);
    train3.add(newStation);
    counter++;
  };
  return [train1, train2, train3];
}
