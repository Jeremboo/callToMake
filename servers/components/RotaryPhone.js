var serialport = require('serialport');
var myEmitter = require('./MyEmitter');


function RotaryPhone(){

  this.HANGUP = 10;
  this.PICKUP = 20;

  //connectTo Arduino
  this.arduinoPlugged = false;
  this.portName = false; // '/dev/tty.usbmodem1421'; '/dev/ttyACM0';

  serialport.list(function (err, ports) {
    ports.forEach(function(port) {
      if(port.pnpId && port.pnpId.match(/arduino/g)) {
        this.portName = port.comName;
      }
    }.bind(this));
 
    if(this.portName){
      this.connectToArduino();
    } else {
      var errorMessage = "Arduino not plugged";
      myEmitter.emit("error", errorMessage);
      console.error(" ERROR : " + errorMessage);
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
  var numSend = parseInt(data);
  switch (numSend) {
    case this.HANGUP:
      myEmitter.emit('hangup');
      break;
    case this.PICKUP:
      myEmitter.emit('pickup');
      break;
    default:
      if(numSend < 10 && numSend >= 0) {
        myEmitter.emit('numComposed', numSend);
      } else {
        console.log("Data Received not recognise : " + numSend);
      }
  }
};

module.exports = RotaryPhone;
