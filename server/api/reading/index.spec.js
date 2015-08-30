'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var readingCtrlStub = {
  index: 'readingCtrl.index',
  show: 'readingCtrl.show',
  create: 'readingCtrl.create',
  update: 'readingCtrl.update',
  destroy: 'readingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var readingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reading.controller': readingCtrlStub
});

describe('Reading API Router:', function() {

  it('should return an express router instance', function() {
    readingIndex.should.equal(routerStub);
  });

  describe('GET /api/readings', function() {

    it('should route to reading.controller.index', function() {
      routerStub.get
        .withArgs('/', 'readingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/readings/:id', function() {

    it('should route to reading.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'readingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/readings', function() {

    it('should route to reading.controller.create', function() {
      routerStub.post
        .withArgs('/', 'readingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/readings/:id', function() {

    it('should route to reading.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'readingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/readings/:id', function() {

    it('should route to reading.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'readingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/readings/:id', function() {

    it('should route to reading.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'readingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
