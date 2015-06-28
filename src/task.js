self.addEventListener('message', function (e) {

  var data = e.data;
  var marker = [];
  var chance = [];
  var iteratorRow = 0;
  var iteratorcol = 0;
  var row = 0;
  var col = 0;

  function setDefaults() {
    for (var i = 0; i < 6; i++) {
      marker.push([false, false, false, false, false, false, false]);
      chance.push([null, null, null, null, null, null, null]);
    }
  }

  function work() {
    if (row >= 0 &&
        row <= 5 &&
        col >= 0 &&
        col <= 6) {

      if (data[row][col] &&
          !marker[row][col] &&
          (data[row][col] === previous || previous === undefined)) {

        marker[row][col] = true;
        var color = data[row][col];

        if (iteratorRow === 0 && iteratorCol === 0) {
          iteratorcol = -1;
        } else if (iteratorRow === 0 && iteratorCol === -1) {
            iteratorcol = -2;
        } else if (iteratorRow === -1 && iteratorCol === 0) {
        }
      }
    }
    return;
  }

  if (data) {
    setDefaults();
    for (var markerRow = 0; markerRow < 6; markerRow++) {
      for (var markerCol = 0; markerCol < 7; markerCol++) {
        if (!marker[markerRow][markerCol]) {
          row = markerRow;
          col = markerCol;
          work();
        }
      }
    }
  }

  /*
  switch (data.cmd) {
    case 'calculate':
      debugger;
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;

    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close();
      break;
  }
  */

}, false);