var serialport = require('serialport');
var myEmitter = require('./MyEmitter');


function RotaryPhone(){

  //connectTo Arduino
  this.arduinoPlugged = false;
  this.portName = false; //'/dev/tty.usbmodem1421';

  serialport.list(function (err, ports) {
    ports.forEach(function(port) {
      if(port.manufacturer.search("Arduino") >= 0) {
        this.portName = port.comName;
      }
    }.bind(this));

    if(this.portName){
      this.connectToArduino();
    } else {
      console.error(" ERROR : Arduino not plugged");
    }
  }.bind(this));
}

RotaryPhone.prototype.connectToArduino = function () {
  console.log("Connect to arduino on "+this.portName+" port.");
  this.sp = new serialport.SerialPort(this.portName, {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false,
      parser: serialport.parsers.readline("\r\n")
  });
  this.arduinoPlugged = true;
  this.sp.on('data', this._dataReceive.bind(this));
};

RotaryPhone.prototype._dataReceive = function (data) {
  console.log(data);
  //TODO : switch les valeurs a émit
  myEmitter.emit('dataReceive', data);
};


module.exports = RotaryPhone;
