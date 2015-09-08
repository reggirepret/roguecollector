/**
 * Rogue model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Rogue = require('./rogue.model');
var RogueEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RogueEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rogue.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RogueEvents.emit(event + ':' + doc._id, doc);
    RogueEvents.emit(event, doc);
  }
}

module.exports = RogueEvents;
