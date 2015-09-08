'use strict';

angular.module('roguecollectorv20App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reading', {
        url: '/reading',
        templateUrl: 'app/reading/reading.html',
        controller: 'ReadingCtrl'
      });
  });
