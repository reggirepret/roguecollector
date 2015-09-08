'use strict';

angular.module('roguecollectorv20App')
  .controller('RogueCtrl',function($scope, $http, socket, User, Auth) {
  $scope.rogues = [];
  $scope.currentuser = [];
  $scope.currentuserid = [];
  $scope.currentuser = User.get();
  $scope.currentuserid = Auth.getID();
  $scope.radioOptions = ['Wind Turbine', 'Solar Panel', 'Weatherstation', 'Windpump'];
  $scope.showForm = 0;
  $scope.currentRogue = [];

  console.log("current user ID: " + $scope.currentuserid);
  $http.get('/api/rogues').then(function(response) {
      $scope.rogues = response.data;
      socket.syncUpdates('rogue', $scope.rogues);
    });

  $scope.addRogue = function() {
      if ($scope.newRogue === '') {
        return;
      }
      $http.post('/api/rogues', { name: $scope.newRogue, userid: $scope.currentuserid });
      $scope.newRogue = '';
    };
   $scope.showDetails = function(Rogue){
   	$scope.showForm = 1;
   	$scope.currentRogue = Rogue;

   };
   $scope.saveRogue = function(Rogue){
   	console.log(Rogue._id);
   	$http.put('/api/rogues/' + Rogue._id, Rogue);
   	socket.emitRogueChanges(Rogue);
   	$scope.currentRogue = [];
   	$scope.showForm = 0;
   	console.log("rogue emitted");
   };
   $scope.viewReadings = function(Rogue) {
   	
   };
});
