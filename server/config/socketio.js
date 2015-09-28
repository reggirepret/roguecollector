  /**
   * Socket.io configuration
   */

  'use strict';

  var config = require('./environment');

  // When the user disconnects.. perform this
  function onDisconnect(socket) {
  }

  // When the user connects.. perform this
  function onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function(data) {
      console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
    });

    // Insert sockets below
    require('../api/rogue/rogue.socket').register(socket);
    require('../api/reading/reading.socket').register(socket);
    require('../api/rouge/rouge.socket').register(socket);
    require('../api/thing/thing.socket').register(socket);

  }

  module.exports = function(socketio) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    // We can authenticate socket.io users and access their token through socket.decoded_token
    //
    // 1. You will need to send the token in `client/components/socket/socket.service.js`
    //
    // 2. Require authentication here:
    // socketio.use(require('socketio-jwt').authorize({
    //   secret: config.secrets.session,
    //   handshake: true
    // }));

    socketio.on('connection', function(socket) {

      socket.address = socket.request.connection.remoteAddress +
        ':' + socket.request.connection.remotePort;

      socket.connectedAt = new Date();

      // Call onDisconnect.
      socket.on('disconnect', function() {
        onDisconnect(socket);
        console.info('[%s] DISCONNECTED', socket.address);
      });
      socket.on('readingemit', function(data){
        var Reading = require('../api/reading/reading.model');
        Reading.create(data, function(err, reading){
          console.log("reading created");
          console.log("New reading ID: " + reading._id);
        });
      });
      socket.on('newRogueIncoming', function() {
        console.log("newRogueIncoming event occured");
        var Rogue = require('../api/rogue/rogue.model');
        var d = {location: 'unknown', sensors: {"BMP180": false, "MCP9808": false, "MAX31855": false, "TMP006": false, "ADC1": false, "ADC2":false, "ADC3": false}};
        Rogue.create(d, function(err,rogue){
          socket.emit('newRogueCreated', rogue);
        });
      });
      socket.on('updateRogueServer', function(data){
        socketio.emit("updateRogueClient", data);
        console.log("complete rogue object: " + data.sensors);
      });
      socket.on("blinkLightsServer", function(data){
        socketio.emit("blinkLightsClient", data);
      });
      // Call onConnect.
      onConnect(socket);
      console.info('[%s] CONNECTED', socket.address);
    });
  };

