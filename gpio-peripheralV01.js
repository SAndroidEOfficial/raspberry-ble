var util = require('util');
var bleno = require('../node_modules/bleno');
var gpio = require('./gpio');
var GPIOService = require('./gpio-service');
/*var GPIOService1 = require('./gpio-service');
var GPIOService2 = require('./gpio-service');
var GPIOService3 = require('./gpio-service');
var GPIOService4 = require('./gpio-service');
var GPIOService5 = require('./gpio-service');
var GPIOService6 = require('./gpio-service');
var GPIOService7 = require('./gpio-service');
var GPIOService8 = require('./gpio-service');
var GPIOService9 = require('./gpio-service');
var GPIOService10 = require('./gpio-service');
var GPIOService11 = require('./gpio-service');
var GPIOService12 = require('./gpio-service');
var GPIOService13 = require('./gpio-service');
var GPIOService14 = require('./gpio-service');
var GPIOService15 = require('./gpio-service');
var GPIOService16 = require('./gpio-service');
var GPIOService17 = require('./gpio-service');
var GPIOService18 = require('./gpio-service');
var GPIOService19 = require('./gpio-service');
var GPIOService20 = require('./gpio-service');
var GPIOService21 = require('./gpio-service');
var GPIOService22 = require('./gpio-service');
var GPIOService23 = require('./gpio-service');
var GPIOService24 = require('./gpio-service');
var GPIOService25 = require('./gpio-service');
var GPIOService26 = require('./gpio-service');
var GPIOService27 = require('./gpio-service');
*/

var name = 'Raspi_GPIOCommander';

var GPIOService1 = new GPIOService(new gpio.GPIO(1), '191020e03d6b4436aff6680c853da373', '191021e03d6b4436aff6680c853da373', '191022e03d6b4436aff6680c853da373', '191023e03d6b4436aff6680c853da373');
var GPIOService2 = new GPIOService(new gpio.GPIO(2), '191020e13d6b4436aff6680c853da373', '191021e13d6b4436aff6680c853da373', '191022e13d6b4436aff6680c853da373', '191023e13d6b4436aff6680c853da373');
var GPIOService3 = new GPIOService(new gpio.GPIO(3), '191020e2-3d6b-4436-aff6-680c853da373', '191021e2-3d6b-4436-aff6-680c853da373', '191022e2-3d6b-4436-aff6-680c853da373', '191023e2-3d6b-4436-aff6-680c853da373');
var GPIOService4 = new GPIOService(new gpio.GPIO(4), '191020e3-3d6b-4436-aff6-680c853da373', '191021e3-3d6b-4436-aff6-680c853da373', '191022e3-3d6b-4436-aff6-680c853da373', '191023e3-3d6b-4436-aff6-680c853da373');
var GPIOService5 = new GPIOService(new gpio.GPIO(5), '191020e4-3d6b-4436-aff6-680c853da373', '191021e4-3d6b-4436-aff6-680c853da373', '191022e4-3d6b-4436-aff6-680c853da373', '191023e4-3d6b-4436-aff6-680c853da373');
var GPIOService6 = new GPIOService(new gpio.GPIO(6), '191020e5-3d6b-4436-aff6-680c853da373', '191021e5-3d6b-4436-aff6-680c853da373', '191022e5-3d6b-4436-aff6-680c853da373', '191023e5-3d6b-4436-aff6-680c853da373');
var GPIOService7 = new GPIOService(new gpio.GPIO(7), '191020e6-3d6b-4436-aff6-680c853da373', '191021e6-3d6b-4436-aff6-680c853da373', '191022e6-3d6b-4436-aff6-680c853da373', '191023e6-3d6b-4436-aff6-680c853da373');
var GPIOService8 = new GPIOService(new gpio.GPIO(8), '191020e7-3d6b-4436-aff6-680c853da373', '191021e7-3d6b-4436-aff6-680c853da373', '191022e7-3d6b-4436-aff6-680c853da373', '191023e7-3d6b-4436-aff6-680c853da373');
var GPIOService9 = new GPIOService(new gpio.GPIO(9), '191020e8-3d6b-4436-aff6-680c853da373', '191021e8-3d6b-4436-aff6-680c853da373', '191022e8-3d6b-4436-aff6-680c853da373', '191023e8-3d6b-4436-aff6-680c853da373');
var GPIOService10 = new GPIOService(new gpio.GPIO(10), '191020e9-3d6b-4436-aff6-680c853da373', '191021e9-3d6b-4436-aff6-680c853da373', '191022e9-3d6b-4436-aff6-680c853da373', '191023e9-3d6b-4436-aff6-680c853da373');
var GPIOService11 = new GPIOService(new gpio.GPIO(11), '191020ea-3d6b-4436-aff6-680c853da373', '191021ea-3d6b-4436-aff6-680c853da373', '191022ea-3d6b-4436-aff6-680c853da373', '191023ea-3d6b-4436-aff6-680c853da373');
var GPIOService12 = new GPIOService(new gpio.GPIO(12), '191020eb-3d6b-4436-aff6-680c853da373', '191021eb-3d6b-4436-aff6-680c853da373', '191022eb-3d6b-4436-aff6-680c853da373', '191023eb-3d6b-4436-aff6-680c853da373');
var GPIOService13 = new GPIOService(new gpio.GPIO(13), '191020ec-3d6b-4436-aff6-680c853da373', '191021ec-3d6b-4436-aff6-680c853da373', '191022ec-3d6b-4436-aff6-680c853da373', '191023ec-3d6b-4436-aff6-680c853da373');
var GPIOService14 = new GPIOService(new gpio.GPIO(14), '191020ed-3d6b-4436-aff6-680c853da373', '191021ed-3d6b-4436-aff6-680c853da373', '191022ed-3d6b-4436-aff6-680c853da373', '191023ed-3d6b-4436-aff6-680c853da373');
var GPIOService15 = new GPIOService(new gpio.GPIO(15), '191020ee-3d6b-4436-aff6-680c853da373', '191021ee-3d6b-4436-aff6-680c853da373', '191022ee-3d6b-4436-aff6-680c853da373', '191023ee-3d6b-4436-aff6-680c853da373');
var GPIOService16 = new GPIOService(new gpio.GPIO(16), '191020ef-3d6b-4436-aff6-680c853da373', '191021ef-3d6b-4436-aff6-680c853da373', '191022ef-3d6b-4436-aff6-680c853da373', '191023ef-3d6b-4436-aff6-680c853da373');
var GPIOService17 = new GPIOService(new gpio.GPIO(17), '191020f0-3d6b-4436-aff6-680c853da373', '191021f0-3d6b-4436-aff6-680c853da373', '191022f0-3d6b-4436-aff6-680c853da373', '191023f0-3d6b-4436-aff6-680c853da373');
var GPIOService18 = new GPIOService(new gpio.GPIO(18), '191020f1-3d6b-4436-aff6-680c853da373', '191021f1-3d6b-4436-aff6-680c853da373', '191022f1-3d6b-4436-aff6-680c853da373', '191023f1-3d6b-4436-aff6-680c853da373');
var GPIOService19 = new GPIOService(new gpio.GPIO(19), '191020f2-3d6b-4436-aff6-680c853da373', '191021f2-3d6b-4436-aff6-680c853da373', '191022f2-3d6b-4436-aff6-680c853da373', '191023f2-3d6b-4436-aff6-680c853da373');
var GPIOService20 = new GPIOService(new gpio.GPIO(20), '191020f3-3d6b-4436-aff6-680c853da373', '191021f3-3d6b-4436-aff6-680c853da373', '191022f3-3d6b-4436-aff6-680c853da373', '191023f3-3d6b-4436-aff6-680c853da373');
var GPIOService21 = new GPIOService(new gpio.GPIO(21), '191020f4-3d6b-4436-aff6-680c853da373', '191021f4-3d6b-4436-aff6-680c853da373', '191022f4-3d6b-4436-aff6-680c853da373', '191023f4-3d6b-4436-aff6-680c853da373');
var GPIOService22 = new GPIOService(new gpio.GPIO(22), '191020f5-3d6b-4436-aff6-680c853da373', '191021f5-3d6b-4436-aff6-680c853da373', '191022f5-3d6b-4436-aff6-680c853da373', '191023f5-3d6b-4436-aff6-680c853da373');
var GPIOService23 = new GPIOService(new gpio.GPIO(23), '191020f6-3d6b-4436-aff6-680c853da373', '191021f6-3d6b-4436-aff6-680c853da373', '191022f6-3d6b-4436-aff6-680c853da373', '191023f6-3d6b-4436-aff6-680c853da373');
var GPIOService24 = new GPIOService(new gpio.GPIO(24), '191020f7-3d6b-4436-aff6-680c853da373', '191021f7-3d6b-4436-aff6-680c853da373', '191022f7-3d6b-4436-aff6-680c853da373', '191023f7-3d6b-4436-aff6-680c853da373');
var GPIOService25 = new GPIOService(new gpio.GPIO(25), '191020f8-3d6b-4436-aff6-680c853da373', '191021f8-3d6b-4436-aff6-680c853da373', '191022f8-3d6b-4436-aff6-680c853da373', '191023f8-3d6b-4436-aff6-680c853da373');
var GPIOService26 = new GPIOService(new gpio.GPIO(26), '191020f9-3d6b-4436-aff6-680c853da373', '191021f9-3d6b-4436-aff6-680c853da373', '191022f9-3d6b-4436-aff6-680c853da373', '191023f9-3d6b-4436-aff6-680c853da373');
var GPIOService27 = new GPIOService(new gpio.GPIO(27), '191020fa-3d6b-4436-aff6-680c853da373', '191021fa-3d6b-4436-aff6-680c853da373', '191022fa-3d6b-4436-aff6-680c853da373', '191023fa-3d6b-4436-aff6-680c853da373');

// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!

bleno.on('stateChange', function(state) {
	
  if (state === 'poweredOn') {
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    bleno.startAdvertising(name, [GPIOService26.uuid], function(err) {
		
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
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    bleno.setServices([
		////GPIOService1,
		GPIOService2,
		GPIOService3,
		GPIOService4,
		GPIOService5,
		GPIOService6,
		GPIOService7,
		GPIOService8,
		GPIOService9,
		GPIOService10,
		GPIOService11,
		GPIOService12,
		GPIOService13,
		GPIOService14,
		GPIOService15,
		GPIOService16,
		GPIOService17,
		GPIOService18,
		GPIOService19,
		GPIOService20,
		GPIOService21,
		GPIOService22,
		GPIOService23,
		GPIOService24,
		GPIOService25,
		GPIOService26,
		GPIOService27
    ]);
  }
  
});