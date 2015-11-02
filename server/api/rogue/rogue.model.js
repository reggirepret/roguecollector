'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var RogueSchema = new Schema({
  	roguetype: { type: String, enum: ['Wind Turbine', 'Solar Panel', 'Weatherstation', 'Windpump'], default: 'Wind Turbine'},
	name: { type: String, default: 'New incoming Rogue Agent'},
	location: String,
  	info: {type: String, default: 'Data regarding location'},
  	userid: Schema.Types.ObjectId,
  	sensors: {type:Schema.Types.Mixed, default: [
  	{name: 'BMP180', value: false, unit:"Temperature [deg C]"}, 
  	{name: 'MCP9808', value:true, unit:"Temperature [deg C]"}, 
  	{name: 'MAX31855', value:false, unit:"Temperature [deg C]"}, 
  	{name: 'TMP006', value:false, unit:"Temperature [deg C]"},
  	{name: 'ADC1', value:false, unit:"Volts [V]"},
  	{name: 'ADC2', value:false, unit:"Volts [V]"},
  	{name: 'ADC3', value:false, unit:"Volts [V]"},
  	{name: 'ADC4', value:false, unit:"Volts [V]"},
  	{name: 'ADC5', value:false, unit:"Volts [V]"},
  	{name: 'ADC6', value:false, unit:"Volts [V]"}]},
  	active: {type: Boolean, default: false},
  	numerOfSensors: {type: Number, default: 10}
});

module.exports = mongoose.model('Rogue', RogueSchema);
