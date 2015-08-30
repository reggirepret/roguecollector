'use strict';

angular.module('roguecollectorv20App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rogue', {
        url: '/rogue',
        templateUrl: 'app/rogue/rogue.html',
        controller: 'RogueCtrl'
      });
  });
