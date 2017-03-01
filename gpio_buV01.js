var util = require('util');
var events = require('events');

var GPIOmode = {
	NONE: 0,
  INPUT:    1,
  OUTPUT: 2,
};

var GPIOstatus = {
	LOW: 0,
	HIGH: 1,
}

var Gpio = require('../node_modules/onoff').Gpio, // Constructor function for Gpio objects.
  io = new Gpio(14, 'in'),
  iv;


function GPIO() {
  events.EventEmitter.call(this);
  this.IOmode = GPIOmode.NONE;
  this.IOstatus = GPIOstatus.LOW;
  this._updateValueCallback = null;
  
}

util.inherits(GPIO, events.EventEmitter);

GPIO.prototype.setMode = function(mode) {
	
	if (mode==GPIOmode.INPUT){
		io.unexport();
		this.IOmode=GPIOmode.INPUT;
		io = new Gpio(14, 'in', 'both');
		io.watch(function (err, value) {
		  if (err) {
			throw err;
		  }
		if (_updateValueCallback!=null){
			this.IOstatus = value;
			this._updateValueCallback(value);
		}
		  console.log('Button pressed!, its value was ' + value);
		});
	}else if(mode==GPIOmode.OUTPUT){
		io.unexport();
		this._updateValueCallback=null;
		this.IOmode=GPIOmode.OUTPUT;
		io = Gpio(14, 'out');
		if(io.readSync()!=0){
			io.writeSync(0);
		}
	}
};

GPIO.prototype.seStatus=function(value){
	if (this.IOmode==GPIOmode.OUTPUT){
		io.writeSync(value);
	}
}

GPIO.prototype.readIOstatus=function(){
	this.IOstatus = io.readSync();
}

module.exports.GPIO = GPIO;

