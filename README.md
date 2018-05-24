# Indoor-Positioning-System
The main purpose of this project is to receive data from the web server, process the received data and convert data to the correct format, to use for the trilateration library. After that, use the trilateration library to perform calculations to determine the location of the object in the canvas window.
 
## Prerequisites
* Internet connection
* Internet Browser
* Code Editor

## Getting Trilateration

* Use rssiToMeter.js code, to change received bluetooth signal strength to meters. Example below:
```
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
```
* server.js sends queries to the server. Each time the response is received, the received data is processed to the corret format
* trilateration.js this script is responsible for location calculations. Displays the location of an object in an certain size window
