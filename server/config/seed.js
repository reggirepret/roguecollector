/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Rogue = require('../api/rogue/rogue.model');
var Reading = require('../api/reading/reading.model');

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Real time monitoring',
      info: 'Monitor any of your distributed systems, in real time!'
    }, {
      name: 'Over air programming',
      info: 'Setup your Rogue using an online portal, no wires required'
    }, {
      name: 'Smart data display',
      info: 'View your collected data in elegant graphs'
    }, {
      name: 'Modular Structure',
      info: 'Can easily scale to cater to all your needs'
    }, {
      name: 'Node based client',
      info: 'Connect any Internet of things device to your profile!'
    }, {
      name: 'Deployment Ready',
      info: 'Node ready for deployment on BeagleBone black'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

  Rogue.find({}).removeAsync()
  .then(function() {
    Rogue.createAsync({
      roguetype: 'Wind Turbine',
      name: 'first one',
      sensors: {'BMP1080': false, 'SHT21': false}
    }, {
      name: 'second'
    }, {
      name: 'third'
    })
  });

  Reading.find({}).removeAsync()
  .then(function(){
    Reading.createAsync({
      timestamp: new Date(1000),
      value: 2,
      datatype: 'BMP180'
    },{
      timestamp: new Date(2000),
      value: 5,
      datatype: 'BMP180'
    },{
      timestamp: new Date(3000),
      value: 8,
      datatype: 'BMP180'
    },{
      timestamp: new Date(4000),
      value: 10,
      datatype: 'BMP180'
    })
  });
