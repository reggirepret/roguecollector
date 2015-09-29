'use strict';

angular.module('roguecollectorv20App')
.controller('RogueCtrl',function($scope, $http, socket, User, Auth, $filter) {
	$scope.myrogues = [];
  $scope.incomingRogues = [];
  $scope.currentRogueID = [];
	$scope.currentuser = [];
	$scope.currentuserid = [];
	$scope.currentuser = User.get();
	$scope.currentuserid = Auth.getID();
	$scope.radioOptions = ['Wind Turbine', 'Solar Panel', 'Weatherstation', 'Windpump'];
  $scope.readingRadioOptions = [{sensorname: 'BMP180'}, {sensorname: 'MCP9808'}, {sensorname: 'MAX31855'}, {sensorname: 'TMP006'}, {sensorname: 'ADC1'}, {sensorname: 'ADC2'}, {sensorname: 'ADC3'}];
  $scope.selectedReadingOption = {sensorname: 'MCP9808'};
  $scope.rogueAcitveOptions = [true, false];

  //for hide and show
  $scope.showEditForm = 0;
  $scope.showReadingForm = 0;
  $scope.showRogues = 1;
  $scope.currentRogue = [];
  $scope.currentRogueReadings = [];
  $scope.averageValue = [];

  //TODO: only get my rouges and unassigned rouges
  //get rouges that are unassigned, add them to the incoming rogues list.
  $http.get('/api/rogues').then(function(response) {
  	$scope.myrogues = response.data;
  	socket.syncUpdates('rogue', $scope.myrogues);
  });

  $scope.addRogue = function() {
  	if ($scope.newRogue === '') {
  		return;
  	}
  	$http.post('/api/rogues', { name: $scope.newRogue, userid: $scope.currentuserid });
  	$scope.newRogue = '';
  };
  $scope.showDetails = function(Rogue){
  	$scope.showEditForm = 1;
  	$scope.currentRogue = Rogue;
  };
  $scope.saveRogue = function(Rogue){
  	$http.put('/api/rogues/' + Rogue._id, Rogue);
  	socket.emitRogueChanges(Rogue);
  	$scope.showEditForm = 0;
    $scope.currentRogue = [];
  };
  $scope.viewReadings = function(Rogue) {
  	$scope.showReadingForm = 1;
  	$scope.showRogues = 0;
  	$scope.currentRogue = Rogue;
    $scope.currentRogueID = Rogue._id;
  	$http.get('/api/readings').then(function(response) {
      $scope.currentRogueReadings = $filter('filter')(response.data, { rogueid: $scope.currentRogue._id });
      console.log($scope.currentRogueReadings);
      console.log(response.data);
  		socket.syncUpdates('reading', $scope.currentRogueReadings);
  	});
};
  	$scope.averageValue = function(myData){ 
  		var sum = 0; 
  		for(var i = 0; i < myData.length; i++){
    		sum += myData[i].value;
    	};
    		var avg = sum/myData.length;
    		return avg; 
		
	};

	$scope.standardDeviation = function(myData){
		var average = $scope.averageValue(myData);
		var variance = 0;
		for(var i = 0; i < myData.length; i++){
			variance += ((myData[i].value - average)*(myData[i].value - average))/myData.length;
		};
		var standarddev = Math.sqrt(variance);
		return standarddev;
	};
	$scope.doneViewing = function(){
		$scope.showReadingForm = 0;
		$scope.showRogues = 1;
		$scope.currentRogue = [];
		console.log("this function fires");
	};
  $scope.blinkLights = function(rogue){
    socket.emit("blinkLightsServer", rogue);
  };
  $scope.claimRogue = function(rogue){
    //mark rogue._id == currentuser._id
    //update DB
    $http.put('/api/rogues/' + rogue._id, rogue);
    //send rogue details update on Socket
    socket.emit("updateRogueServer", rogue);
  };
  $scope.deleteRogue = function(rogue){
    $http.delete('/api/rogues/' + rogue._id);
  };
  $scope.$on('$destroy', function() {
      socket.unsyncUpdates('rogue');
    });
});