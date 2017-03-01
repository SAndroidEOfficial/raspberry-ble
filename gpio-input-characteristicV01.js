var util = require('util');
var bleno = require('../node_modules/bleno');
var gpio = require('./gpio');

function GpioInputCharacteristic(gpio, uuidMine) {
	bleno.Characteristic.call(this, {
		uuid: uuidMine,
		properties: ['read', 'write', 'notify'],
		descriptors: [
		new bleno.Descriptor({
			uuid: '2903',
			value: 'read the vslue of the GPIO.'
		})
		]
	});
	this.gpio = gpio;
}

util.inherits(GpioInputCharacteristic, bleno.Characteristic);

GpioInputCharacteristic.prototype.onReadRequest = function(offset, callback) {
	console.log('GpioInputCharacteristic - Read request');
	
	if (offset) {
		callback(this.RESULT_ATTR_NOT_LONG, null);
	}
	
	else{
		var data = new Buffer(1);
		data.writeUInt8(this.gpio.readIOstatus(), 0);
		callback(this.RESULT_SUCCESS, data);
	}
	
};



GpioInputCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
	console.log('GpioInputCharacteristic - onSubscribe');
	console.log('maxValuesize: '+maxValueSize);
	
	if (updateValueCallback==null){
		console.log('updateValueCallback è null');
	}
	
	this.gpio.setCallbackFunct(updateValueCallback);
};

GpioInputCharacteristic.prototype.onUnsubscribe = function() {
	console.log('GpioInputCharacteristic - onUnsubscribe');
	this.gpio._updateValueCallback = null;
};

module.exports = GpioInputCharacteristic;