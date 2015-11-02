'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ReadingSchema = new Schema({
  	value: { type: Number, default: 50 },
  	timestamp: { type: Date, default: Date.now },
  	datatype: { type: String },
  	rogueid: Schema.Types.ObjectId
});

module.exports = mongoose.model('Reading', ReadingSchema);
