var util = require('util');
var bleno = require('../node_modules/bleno');

function GpioSetOutputCharacteristic(gpio, uuidMine) {
	bleno.Characteristic.call(this,{
    uuid: uuidMine,
    properties: ['read', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2902',
        value: 'sets the vslue of the GPIO.'
      })
    ]
  });
  this.gpio = gpio;
}

util.inherits(GpioSetOutputCharacteristic, bleno.Characteristic);

GpioSetOutputCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
	console.log('GpioSetOutputCharacteristic - Write request');
	
    if (offset) {
		callback(this.RESULT_ATTR_NOT_LONG);
	}
	else if (data.length !== 1) {
		callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
	}
	
	else {
		console.log('GpioSetOutputCharacteristic - Write request: in write else');
		console.log('GpioSetOutputCharacteristic - Write request: this.gpio.IOmode: '+this.gpio.IOmode);
		console.log('GpioSetOutputCharacteristic - Write request: this.gpio.IOmode: '+this.gpio.getIOGPIOmodeOUTPUT());
		if (this.gpio.IOmode==this.gpio.getIOGPIOmodeOUTPUT()){
			var value = data.readUInt8(0);
			console.log('GpioSetOutputCharacteristic - Write request: setting value: '+value);
		switch (value) {
			case 0:
			case 1:
				console.log('GpioSetOutputCharacteristic - Write request: setting value: '+value);
				this.gpio.setStatus(value);
				callback(this.RESULT_SUCCESS);
				break;
			default:
				callback(this.RESULT_UNLIKELY_ERROR);
			break;
		}
		}
	  
		else{
			callback(this.RESULT_UNLIKELY_ERROR);
		}

  }
};

GpioSetOutputCharacteristic.prototype.onReadRequest = function(offset, callback) {
	console.log('GpioSetOutputCharacteristic - Read request');
	
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  
  else {
    var data = new Buffer(1);
	this.gpio.readIOstatus();
    data.writeUInt8(this.gpio.IOstatus, 0);
    callback(this.RESULT_SUCCESS, data);
	}
	
};

module.exports = GpioSetOutputCharacteristic;