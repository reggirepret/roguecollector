'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rougeCtrlStub = {
  index: 'rougeCtrl.index',
  show: 'rougeCtrl.show',
  create: 'rougeCtrl.create',
  update: 'rougeCtrl.update',
  destroy: 'rougeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rougeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './rouge.controller': rougeCtrlStub
});

describe('Rouge API Router:', function() {

  it('should return an express router instance', function() {
    rougeIndex.should.equal(routerStub);
  });

  describe('GET /api/rouges', function() {

    it('should route to rouge.controller.index', function() {
      routerStub.get
        .withArgs('/', 'rougeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/rouges/:id', function() {

    it('should route to rouge.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'rougeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/rouges', function() {

    it('should route to rouge.controller.create', function() {
      routerStub.post
        .withArgs('/', 'rougeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/rouges/:id', function() {

    it('should route to rouge.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'rougeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rouges/:id', function() {

    it('should route to rouge.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'rougeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rouges/:id', function() {

    it('should route to rouge.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'rougeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
