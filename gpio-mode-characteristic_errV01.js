var util = require('util');
var bleno = require('../node_modules/bleno');
var gpio = require('./gpio');

function GpioSetModeCharacteristic(gpio, uuidMine) {
	bleno.Characteristic.call(this,{
		uuid: uuidMine,
		properties: ['read', 'write'],
		descriptors:[
		new bleno.Descriptor({
			uuid: '2901',
			value: 'Gets or sets the mode of the GPIO.'
			})
		]
	});
  
	this.gpio = gpio;
    this.onWriteRequestMe = function(data, offset, withoutResponse, callback){
		console.log('GpioSetModeCharacteristic - Write request');
		
		if (offset) {
			callback(this.RESULT_ATTR_NOT_LONG);
		}
		
		else if (data.length !== 1) {
			callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
		}
		
		else{
			var mode = data.readUInt8(0);
			console.log('GpioSetModeCharacteristic - Write request: data: '+data);
			console.log('GpioSetModeCharacteristic - Write request: mode: '+mode);
			switch (mode) {
				case this.gpio.getIOGPIOmodeINPUT():
				case this.gpio.getIOGPIOmodeNONE():
				case this.gpio.getIOGPIOmodeOUTPUT():
					this.gpio.setMode(mode);
					callback(this.RESULT_SUCCESS);
				break;
				default:
					callback(this.RESULT_UNLIKELY_ERROR);
				break;
			}	
		}
	};

	this.onReadRequestMe = function(offset, callback){
		console.log('GpioSetModeCharacteristic - Read request');
		
		if (offset) {
			callback(this.RESULT_ATTR_NOT_LONG, null);
		}
		
		else {
			var data = new Buffer(1);
			data.writeUInt8(this.gpio.IOmode, 0);
			callback(this.RESULT_SUCCESS, data);
		}
	};
	me=this;
}

util.inherits(GpioSetModeCharacteristic, bleno.Characteristic);

GpioSetModeCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
	console.log('GpioSetModeCharacteristic - Write request');
	me.onWriteRequestMe(data, offset, withoutResponse, callback);
};

GpioSetModeCharacteristic.prototype.onReadRequest = function(offset, callback) {
	console.log('GpioSetModeCharacteristic - Read request');
	me.onReadRequestMe(offset, callback);
};

module.exports = GpioSetModeCharacteristic;