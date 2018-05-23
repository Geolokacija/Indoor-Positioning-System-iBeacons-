
     var socket = io("https://websocket-server-2018.herokuapp.com");
     var distanceIjjd;
     var distanceTxUq;
     var distanceHjQc;

     var objFromIjjd;
     var objFromTxUq;
     var objFromHjQc;

     var ijjd;
     var txUq;
     var hjQc;

     //Jei informacija priimama:
     socket.on('beaconData', function(beaconData) {

       //console.log(JSON.parse(beaconData));
       objFromIjjd = JSON.parse(beaconData);

       for (var i = 0; i < objFromIjjd.length; i++) {
         if (objFromIjjd[i].uniqueId == "TxUq"){
           txUq = objFromIjjd[i].distance * 100;
           if(txUq >= 900){
             txUq = 900;
           }
         } else if (objFromIjjd[i].address == "F0:BE:91:4F:F0:6C"){
           hjQc = objFromIjjd[i].distance * 200;
           if(hjQc >= 900){
             hjQc = 900;
           }
         } else if (objFromIjjd[i].uniqueId == "Ijjd"){
           ijjd = objFromIjjd[i].distance * 100;
           if(ijjd >= 900){
             ijjd = 900;
           }
         }
       }
       console.log(objFromIjjd[0].distance + " " + "hjQc");
       console.log(objFromIjjd[1].distance + " " + objFromIjjd[1].uniqueId);
       console.log(objFromIjjd[2].distance  + " " + objFromIjjd[2].uniqueId);
       console.log("--------------------------------");

       //iškviečiama trilateration biblioteka, skaičiuota vietai lange
       init(ijjd, txUq, hjQc);

     });
