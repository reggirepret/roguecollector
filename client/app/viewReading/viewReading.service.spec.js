'use strict';

describe('Service: viewReading', function () {

  // load the service's module
  beforeEach(module('roguecollectorv20App'));

  // instantiate service
  var viewReading;
  beforeEach(inject(function (_viewReading_) {
    viewReading = _viewReading_;
  }));

  it('should do something', function () {
    expect(!!viewReading).toBe(true);
  });

});
