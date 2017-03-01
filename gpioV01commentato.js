// DICHIARAZIONE VARIABILI
// Nota01: In javascript, se dichiari una variabile senza il tag var, è più o meno come dichiarare una variabile globale (anche se può essere cancellata col comando 'delete').

var util = require('util'); // 'require' è usato per caricare un modulo
var events = require('events');
var bleno = require('../node_modules/bleno');

var BlenoCharacteristic = bleno.Characteristic; // Apparentemente BlenoCharacteristic non è più usato in questo codice.

var GPIOmode = { // GPIOmode è un oggetto con 3 proprietà: NONE, INPUT, OUTPUT.
	NONE: -1,
	INPUT: 0,
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

var GPIOstatus = { // Come GPIOmode
	LOW: 0,
	HIGH: 1,
}

// Constructor function for Gpio objects.
var Gpio = require('../node_modules/onoff').Gpio,io,iv,_updateValueCallback;

var GpioNum;
var me;
var gpioValue=0;

var setDir = function(eo){ // Definisco una function, definita solo quando viene raggiunta la riga. Ricorda che una function è anche un oggetto in JS.
	eo.io.setDirection('out'); // Probabilmente con questa dichiarazione forza il piedino a essere output.
};

var setVaue = function(eo){ // Typo nel nome? setVaLue invece di setVaue?
		if(eo.io.readSync()!=0){ // Versione sincrona del metodo read
		eo.io.writeSync(0);}
	};

var setCB = function(eo){ // Quando questa function viene chiamata, eseguo una serie di operazioni su eo
	eo.io.watch(function(err, value){ // Il metodo 'watch' è usato per specificare una funzione di callback che viene eseguita ogni volta che (?)c'è un cambio nell'io.
									  // L'argomento value passato alla funzione di callback rappresenta lo stato dell'io.
		
		if (err) {
			throw err; // 'throw' permette di ritornare un errore, se per caso questo avviene.
		}
			  
		console.log('input: callback is '+eo+' '+eo.GpioNum+', real gpio: '+eo.io.gpio); // console.log è usato per tenere traccia e monitorare eventi ed eventuali errori.
			  
		if (eo._updateValueCallback!=null){ // Callback da chiamare quando il valore cambia. Quindi questo if parte se il valore di eo cambia.
			console.log('input: callo, value= '+value);
			// var data = new Buffer(1);
			// data.writeUInt8(value, 0);
			if (eo.gpioValue!=value){ // Se eo.gpioValue è diverso da value, allora lo stta uguale e poi fa l'update.
				eo.gpioValue=value;
				// var data = new Buffer(3);
				// data.writeUInt8(0x3, 0);
				// data.writeUInt8(0x2, 1);
				// data.writeUInt8(0x1, 2);
				// eo._updateValueCallback(data);
				eo._updateValueCallback(new Buffer([value]));
			}
		}
		eo.IOstatus = value;
	});
}

// var callbackInput=function (err, value){
	// if (err) {
		// throw err;
	// }
	// console.log('input: callback is '+eo+' '+eo.GpioNum+', real gpio: '+eo.io.gpio);
	// if (eo._updateValueCallback!=null){
		// eo._updateValueCallback(new Buffer([value]));
	// }
	// eo.IOstatus = value;
// };

///////////////////////////////////////////////////////////////////////////////////////////////////

// INIZIA LO SCRIPT VERO E PROPRIO

function GPIO(num) { // 'num' è l'argomento passato alla function.
	this.GpioNum=num; // Il significato di 'this' all'interno di una function dipende da come la function è chiamata. In questo caso è come se fosse una var globale.
	this.io = new Gpio(num, 'in', 'both');
	console.log('gpio - new Gpio n: '+this.GpioNum+', real gpio: '+this.io.gpio);
	
	/////
	setCB(this);
	console.log('direction is: '+this.io.direction());
	/////
	
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
	
	//this._value = new Buffer(0);

this.setMode = function(mode) {
	console.log('gpio - set mode: '+mode+" to Gpio n: "+this.GpioNum+', real gpio: '+this.io.gpio);
	if (mode==GPIOmode.INPUT){
		//io.unexport();
		if (me.IOmode!=GPIOmode.INPUT){
			me.IOmode=GPIOmode.INPUT;
			this.io.setDirection('in');
			this.io.setEdge('both');
			//this.io.watch();
			setCB(this);
		}
	}else if(mode==GPIOmode.OUTPUT){
		if (me.IOmode!=GPIOmode.OUTPUT){
			this.IOmode=GPIOmode.OUTPUT;
			console.log('direction is: '+this.io.direction()+', real gpio: '+this.io.gpio);
			this.io.setEdge('none');
			this.io.unwatch(this.callbackInput);
			
			var delay=100; //1 second

			setTimeout(
			// function() {
				// this.io.setDirection('out');
			// }
			setDir(this)
			, delay);
						
			setTimeout(
			// function() {
				// console.log('direction is: '+this.io.direction());
				// if(this.io.readSync()!=0){
					// this.io.writeSync(0);
				// }
			//}
			setVaue(this)
			, delay*2);
			//
			//io = Gpio(this.GpioNum, 'out');
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
} //Cosa chiude questa parentesi?
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

//exports.GPIO = GPIO;

