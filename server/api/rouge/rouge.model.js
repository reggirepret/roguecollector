'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var RougeSchema = new Schema({
  	roguetype: { type: String, enum: ['windturbine', 'solarpanel', 'weatherstation', 'windpump'], default: 'windturbine'},
	name: { type: String, default: 'New incoming Rogue Agent'},
	location: String,
  	info: {type: String, default: 'Data regarding location'},
  	userid: Schema.Types.ObjectId,
  	active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Rouge', RougeSchema);
