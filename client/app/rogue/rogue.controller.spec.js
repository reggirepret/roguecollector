'use strict';

describe('Controller: RogueCtrl', function () {

  // load the controller's module
  beforeEach(module('roguecollectorv20App'));

  var RogueCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RogueCtrl = $controller('RogueCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
