'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ReadingSchema = new Schema({
  	value: { type: Number, default: 50 },
  	timestamp: { type: Date, default: Date.now },
  	datatype: { type: String, enum: ['BMP180', 'MCP9808', 'MAX31855', 'TMP006', 'ADC1', 'ADC2', 'ADC3']},
  	rogueid: Schema.Types.ObjectId
});

module.exports = mongoose.model('Reading', ReadingSchema);
