'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rogueCtrlStub = {
  index: 'rogueCtrl.index',
  show: 'rogueCtrl.show',
  create: 'rogueCtrl.create',
  update: 'rogueCtrl.update',
  destroy: 'rogueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rogueIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './rogue.controller': rogueCtrlStub
});

describe('Rogue API Router:', function() {

  it('should return an express router instance', function() {
    rogueIndex.should.equal(routerStub);
  });

  describe('GET /api/rogues', function() {

    it('should route to rogue.controller.index', function() {
      routerStub.get
        .withArgs('/', 'rogueCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/rogues/:id', function() {

    it('should route to rogue.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'rogueCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/rogues', function() {

    it('should route to rogue.controller.create', function() {
      routerStub.post
        .withArgs('/', 'rogueCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/rogues/:id', function() {

    it('should route to rogue.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'rogueCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rogues/:id', function() {

    it('should route to rogue.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'rogueCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rogues/:id', function() {

    it('should route to rogue.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'rogueCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
