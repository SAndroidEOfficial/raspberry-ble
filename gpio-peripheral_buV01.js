var util = require('util');

//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
var bleno = require('../node_modules/bleno');

//
// Pizza
// * has crust
// * has toppings
// * can be baked
//
var gpio = require('./gpio');

//
// The BLE Pizza Service!
//
var GPIOService = require('./gpio-service');

//
// A name to advertise our Pizza Service.
//
var name = 'Raspi_GPIOCommander';
var GPIOService = new GPIOService(new gpio.GPIO(2), '13333333333333333333333333333337', '13333333333333333333333333330001', '13333333333333333333333333330002', '13333333333333333333333333330003');

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [GPIOService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      GPIOService
    ]);
  }
});
