'use strict';

var app = require('../..');
var request = require('supertest');

var newRouge;

describe('Rouge API:', function() {

  describe('GET /api/rouges', function() {
    var rouges;

    beforeEach(function(done) {
      request(app)
        .get('/api/rouges')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          rouges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      rouges.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/rouges', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rouges')
        .send({
          name: 'New Rouge',
          info: 'This is the brand new rouge!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newRouge = res.body;
          done();
        });
    });

    it('should respond with the newly created rouge', function() {
      newRouge.name.should.equal('New Rouge');
      newRouge.info.should.equal('This is the brand new rouge!!!');
    });

  });

  describe('GET /api/rouges/:id', function() {
    var rouge;

    beforeEach(function(done) {
      request(app)
        .get('/api/rouges/' + newRouge._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          rouge = res.body;
          done();
        });
    });

    afterEach(function() {
      rouge = {};
    });

    it('should respond with the requested rouge', function() {
      rouge.name.should.equal('New Rouge');
      rouge.info.should.equal('This is the brand new rouge!!!');
    });

  });

  describe('PUT /api/rouges/:id', function() {
    var updatedRouge

    beforeEach(function(done) {
      request(app)
        .put('/api/rouges/' + newRouge._id)
        .send({
          name: 'Updated Rouge',
          info: 'This is the updated rouge!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRouge = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRouge = {};
    });

    it('should respond with the updated rouge', function() {
      updatedRouge.name.should.equal('Updated Rouge');
      updatedRouge.info.should.equal('This is the updated rouge!!!');
    });

  });

  describe('DELETE /api/rouges/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rouges/' + newRouge._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rouge does not exist', function(done) {
      request(app)
        .delete('/api/rouges/' + newRouge._id)
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
