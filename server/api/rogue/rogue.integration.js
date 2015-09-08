'use strict';

var app = require('../..');
var request = require('supertest');

var newRogue;

describe('Rogue API:', function() {

  describe('GET /api/rogues', function() {
    var rogues;

    beforeEach(function(done) {
      request(app)
        .get('/api/rogues')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          rogues = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      rogues.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/rogues', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rogues')
        .send({
          name: 'New Rogue',
          info: 'This is the brand new rogue!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newRogue = res.body;
          done();
        });
    });

    it('should respond with the newly created rogue', function() {
      newRogue.name.should.equal('New Rogue');
      newRogue.info.should.equal('This is the brand new rogue!!!');
    });

  });

  describe('GET /api/rogues/:id', function() {
    var rogue;

    beforeEach(function(done) {
      request(app)
        .get('/api/rogues/' + newRogue._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          rogue = res.body;
          done();
        });
    });

    afterEach(function() {
      rogue = {};
    });

    it('should respond with the requested rogue', function() {
      rogue.name.should.equal('New Rogue');
      rogue.info.should.equal('This is the brand new rogue!!!');
    });

  });

  describe('PUT /api/rogues/:id', function() {
    var updatedRogue

    beforeEach(function(done) {
      request(app)
        .put('/api/rogues/' + newRogue._id)
        .send({
          name: 'Updated Rogue',
          info: 'This is the updated rogue!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRogue = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRogue = {};
    });

    it('should respond with the updated rogue', function() {
      updatedRogue.name.should.equal('Updated Rogue');
      updatedRogue.info.should.equal('This is the updated rogue!!!');
    });

  });

  describe('DELETE /api/rogues/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rogues/' + newRogue._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rogue does not exist', function(done) {
      request(app)
        .delete('/api/rogues/' + newRogue._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
