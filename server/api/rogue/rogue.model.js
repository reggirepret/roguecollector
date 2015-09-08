'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var RogueSchema = new Schema({
  	roguetype: { type: String, enum: ['Wind Turbine', 'Solar Panel', 'Weatherstation', 'Windpump'], default: 'Wind Turbine'},
	name: { type: String, default: 'New incoming Rogue Agent'},
	location: String,
  	info: {type: String, default: 'Data regarding location'},
  	userid: Schema.Types.ObjectId,
  	active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Rogue', RogueSchema);
