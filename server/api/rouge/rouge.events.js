/**
 * Rouge model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Rouge = require('./rouge.model');
var RougeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RougeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rouge.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RougeEvents.emit(event + ':' + doc._id, doc);
    RougeEvents.emit(event, doc);
  }
}

module.exports = RougeEvents;
