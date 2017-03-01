var util = require('util');
var events = require('events');

var GPIOmode = {
	NONE: -1,
  INPUT:    0,
  OUTPUT: 1,
};

// GPIO.prototype.getIOGPIOmodeINPUT=function(){
	// return GPIOmode.INPUT;
// }

// GPIO.prototype.getIOGPIOmodeNONE=function(){
	// return GPIOmode.NONE;
// }
// GPIO.prototype.getIOGPIOmodeOUTPUT=function(){
	// return GPIOmode.OUTPUT;
// }





var GPIOstatus = {
	LOW: 0,
	HIGH: 1,
}

var Gpio = require('../node_modules/onoff').Gpio, // Constructor function for Gpio objects.
  io,
  iv,
  _updateValueCallback;

var GpioNum;
var me;

function GPIO(num) {
	
	this.GpioNum=num;
	console.log('gpio - new Gpio n: '+this.GpioNum);
	this.io = new Gpio(num, 'in', 'both');
	me=this;
	/////
	this.io.watch(function (err, value) {
	  if (err) {
		throw err;
	  }
	 	
	  console.log('constr: callback is '+this+' '+this.GpioNum);
	if (me._updateValueCallback!=null){
		
		me._updateValueCallback(new Buffer([value]));
	}
	me.IOstatus = value;
	});
	console.log('direction is: '+this.io.direction());
	/////
	events.EventEmitter.call(this);
	this.IOmode = GPIOmode.INPUT;
	this.IOstatus = GPIOstatus.LOW;
	this._updateValueCallback = null;

	
	
	this.getIOGPIOmodeINPUT=function(){
	return GPIOmode.INPUT;
	}

	this.getIOGPIOmodeNONE=function(){
		return GPIOmode.NONE;
	}
	this.getIOGPIOmodeOUTPUT=function(){
		return GPIOmode.OUTPUT;
	}
	
	//this._value = new Buffer(0);
}
module.exports.GPIO = GPIO;

util.inherits(GPIO, events.EventEmitter);

GPIO.prototype.setMode = function(mode) {
	console.log('gpio - set mode: '+mode+" to Gpio n: "+this.GpioNum);
	if (mode==GPIOmode.INPUT){
		//io.unexport();
		if (me.IOmode!=GPIOmode.INPUT){
			me.IOmode=GPIOmode.INPUT;
			this.io.setDirection('in');
			this.io.setEdge('both');
			this.io.watch(function (err, value) {
			  if (err) {
				throw err;
			  }
			 
			  //callback=this.getCallback();
			  console.log('input: callback is '+this+' '+this.GpioNum);
			if (me._updateValueCallback!=null){
				//console.log('callback not null ');
				
				me._updateValueCallback(new Buffer([value]));
			}
			me.IOstatus = value;
			  //console.log('Button pressed!, its value was ' + value);
			});
		}
	}else if(mode==GPIOmode.OUTPUT){
		if (me.IOmode!=GPIOmode.OUTPUT){
			this.IOmode=GPIOmode.OUTPUT;
			console.log('direction is: '+this.io.direction());
			this.io.setEdge('none');
			this.io.unwatch();
			
			var delay=100; //1 second

			setTimeout(function() {
				
			  this.io.setDirection('out');
			}, delay);
			
			
			setTimeout(function() {
				console.log('direction is: '+this.io.direction());
				if(this.io.readSync()!=0){
					this.io.writeSync(0);
				}
			}, delay*2);
			//
			//io = Gpio(this.GpioNum, 'out');

		}
	}
};

GPIO.prototype.setStatus=function(value){
	console.log('writing value'+" to Gpio n: "+this.GpioNum);
	if (this.IOmode==GPIOmode.OUTPUT){
		console.log('writing value: '+value);
		this.io.writeSync(value);
	}
}

GPIO.prototype.readIOstatus=function(){
	this.IOstatus = this.io.readSync();
	return this.IOstatus;
}

GPIO.prototype.setCallbackFunct=function(callback){
	this._updateValueCallback = callback;
	console.log('updated callback');
}

GPIO.prototype.getGPIOMODE=function(mode){
	if (mode==GPIOmode.OUTPUT)
		return GPIOmode.OUTPUT;
	else if (mode==GPIOmode.INPUT)
		return GPIOmode.INPUT;
	else
		return GPIOmode.NONE
}

GPIO.prototype.getGPIOMODE_OUTPUT=function(){
		return GPIOmode.OUTPUT;
}
GPIO.prototype.getGPIOMODE_INPUT=function(){
		return GPIOmode.INPUT;
}

//test
/* GPIO.prototype.notificationTest=function(){
		if (this._updateValueCallback==null){
			console.log('gpio - updateValueCallback è null');
		}
		io.unexport();
		me.IOmode=GPIOmode.INPUT;
		io = new Gpio(14, 'in', 'both');
		io.watch(function (err, value) {
		  if (err) {
			throw err;
		  }
		 
		  //callback=this.getCallback();
		  console.log('callback is '+me);
		if (me._updateValueCallback!=null){
			//console.log('callback not null ');
			
			me._updateValueCallback(new Buffer([value]));
		}
		me.IOstatus = value;
		  //console.log('Button pressed!, its value was ' + value);
		});
} */



