var util = require('util');
var events = require('events');

var GPIOmode = {
	NONE: -1,
  INPUT:    0,
  OUTPUT: 1,
};

var GPIOstatus = {
	LOW: 0,
	HIGH: 1,
}

// Constructor function for Gpio objects.
var Gpio = require('../node_modules/onoff').Gpio,io,iv,_updateValueCallback;
var GpioNum;
var me;

function GPIO(num) {
	this.GpioNum=num;
	this.io = new Gpio(num, 'in', 'both');
	console.log('gpio - new Gpio n: '+this.GpioNum+', real gpio: '+this.io.gpio);

	this.io.watch(function (err, value){
		
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

	events.EventEmitter.call(this);
	this.IOmode = GPIOmode.INPUT;
	this.IOstatus = GPIOstatus.LOW;
	this._updateValueCallback = null;
	me=this;
	
	this.getIOGPIOmodeINPUT=function(){
		return GPIOmode.INPUT;
	}

	this.getIOGPIOmodeNONE=function(){
		return GPIOmode.NONE;
	}
	
	this.getIOGPIOmodeOUTPUT=function(){
		return GPIOmode.OUTPUT;
	}

	var setDir = function(eo){
	eo.io.setDirection('out');
	}	

	var setVaue = function(eo){
		if(eo.io.readSync()!=0){
			eo.io.writeSync(0);
		}
	}

	this.setMode = function(mode) {
		console.log('gpio - set mode: '+mode+" to Gpio n: "+this.GpioNum+', real gpio: '+this.io.gpio);
		
		if (mode==GPIOmode.INPUT){

			if (me.IOmode!=GPIOmode.INPUT){
				me.IOmode=GPIOmode.INPUT;
				this.io.setDirection('in');
				this.io.setEdge('both');
				
				this.io.watch(function (err, value){
					
				if (err) {
					throw err;
				}
				 
				console.log('input: callback is '+this+' '+this.GpioNum+', real gpio: '+this.io.gpio);
				
				if (me._updateValueCallback!=null){
					me._updateValueCallback(new Buffer([value]));
				}
				
				me.IOstatus = value;

				});
			}			
		}
		
		else if(mode==GPIOmode.OUTPUT){
			
			if (me.IOmode!=GPIOmode.OUTPUT){
				this.IOmode=GPIOmode.OUTPUT;
				console.log('direction is: '+this.io.direction()+', real gpio: '+this.io.gpio);
				this.io.setEdge('none');
				this.io.unwatch();
				var delay=100; //1 second
				setTimeout(setDir(this),delay);
				setTimeout(setVaue(this),delay*2);
			}
			
		}
	};

	this.setStatus=function(value){
		console.log('writing value'+" to Gpio n: "+this.GpioNum+', real gpio: '+this.io.gpio);
		
		if (this.IOmode==GPIOmode.OUTPUT){
			console.log('writing value: '+value);
			this.io.writeSync(value);
		}
		
	};

	this.readIOstatus=function(){
		this.IOstatus = this.io.readSync();
		return this.IOstatus;
	};

	this.setCallbackFunct=function(callback){
		this._updateValueCallback = callback;
		console.log('updated callback');
	};
}

exports.GPIO = GPIO;
util.inherits(GPIO, events.EventEmitter);

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