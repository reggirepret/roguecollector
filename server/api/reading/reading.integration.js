'use strict';

var app = require('../..');
var request = require('supertest');

var newReading;

describe('Reading API:', function() {

  describe('GET /api/readings', function() {
    var readings;

    beforeEach(function(done) {
      request(app)
        .get('/api/readings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          readings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      readings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/readings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/readings')
        .send({
          name: 'New Reading',
          info: 'This is the brand new reading!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newReading = res.body;
          done();
        });
    });

    it('should respond with the newly created reading', function() {
      newReading.name.should.equal('New Reading');
      newReading.info.should.equal('This is the brand new reading!!!');
    });

  });

  describe('GET /api/readings/:id', function() {
    var reading;

    beforeEach(function(done) {
      request(app)
        .get('/api/readings/' + newReading._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          reading = res.body;
          done();
        });
    });

    afterEach(function() {
      reading = {};
    });

    it('should respond with the requested reading', function() {
      reading.name.should.equal('New Reading');
      reading.info.should.equal('This is the brand new reading!!!');
    });

  });

  describe('PUT /api/readings/:id', function() {
    var updatedReading

    beforeEach(function(done) {
      request(app)
        .put('/api/readings/' + newReading._id)
        .send({
          name: 'Updated Reading',
          info: 'This is the updated reading!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReading = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReading = {};
    });

    it('should respond with the updated reading', function() {
      updatedReading.name.should.equal('Updated Reading');
      updatedReading.info.should.equal('This is the updated reading!!!');
    });

  });

  describe('DELETE /api/readings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/readings/' + newReading._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reading does not exist', function(done) {
      request(app)
        .delete('/api/readings/' + newReading._id)
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
