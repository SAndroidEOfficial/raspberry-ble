var util = require('util');
var bleno = require('../node_modules/bleno');

var GpioOutputCharacteristic = require('./gpio-output-characteristic');
var GpioModeCharacteristic = require('./gpio-mode-characteristic');
var GpioInputCharacteristic = require('./gpio-input-characteristic');

function GPIOService(gpio, uuidMine, uuidMode, uuidIn, uuidOut) {
    bleno.PrimaryService.call(this, {
        uuid: uuidMine,
        characteristics: [
            new GpioModeCharacteristic(gpio, uuidMode),
            new GpioOutputCharacteristic(gpio, uuidOut),
            new GpioInputCharacteristic(gpio, uuidIn)
        ]
    });
}

util.inherits(GPIOService, bleno.PrimaryService);
module.exports = GPIOService;
