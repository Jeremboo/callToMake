var serialport = require('serialport');
var portName = '/dev/ttyACM0';
var sp;

connectToSerialPort();

// ##
// CONNECTION TO SERIAL PORT
function connectToSerialPort(){
  console.log("Connect to Arduino by seriaPort "+portName);

  sp = new serialport.SerialPort(portName, {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false,
      parser: serialport.parsers.readline("\r\n")
  });

  sp.on('data', function(input) {

    console.log("INPUT : ", input);

    var jsonBuffer = "{";

    // ##
    // CREATE JSON TO INPUT
    if(input != "" ){
      var list = input.split(";");
      for (var i = 0; i < list.length; i++) {
        if(list[i] != "" ){
          var data = list[i].split(":");
          console.log("PARSED : ")
          console.log(data[0], data[1]);
          console.log("");
        }
      };
    }
  });
}
