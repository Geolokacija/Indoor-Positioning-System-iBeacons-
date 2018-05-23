
function calculateDistanceUsingTxP(rssi, txPower) {

  if (rssi == 0) {
    return -1.0;
  }

  var ratio = rssi*1.0/txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  }
  else {
    var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;
    return distance;
  }
}
