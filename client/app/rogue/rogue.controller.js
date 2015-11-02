'use strict';

angular.module('roguecollectorv20App')
.controller('RogueCtrl',function($scope, $http, socket, User, Auth, $filter) {
	$scope.myrogues = [];
  $scope.currentRogueID = [];
	$scope.currentuser = User.get();
	$scope.currentuserid = Auth.getID();
	$scope.radioOptions = ['Wind Turbine', 'Solar Panel', 'Weatherstation', 'Windpump'];
  $scope.readingRadioOptions = [{sensorname: 'BMP180'}, {sensorname: 'MCP9808'}, {sensorname: 'MAX31855'}, {sensorname: 'TMP006'}, {sensorname: 'ADC1'}, {sensorname: 'ADC2'}, {sensorname: 'ADC3'}, {sensorname: 'ADC4'}, {sensorname: 'ADC5'}, {sensorname: 'ADC6'}];
  $scope.selectedReadingOption = {sensorname: 'MCP9808'};
  $scope.rogueAcitveOptions = [true, false];

  //for hide and show
  $scope.showEditForm = 0;
  $scope.showReadingForm = 0;
  $scope.showRogues = 1;
  $scope.currentRogue = [];
  $scope.currentRogueReadings = [];
  $scope.currentRogueReadingsTemp = [];
  $scope.averageValue = [];
  $scope.showGraph = 0;
  $scope.selectedUnit = "";

  //TODO: only get my rouges and unassigned rouges
  //get rouges that are unassigned, add them to the incoming rogues list.
  $http.get('/api/rogues').then(function(response) {
  	$scope.myrogues = response.data;
  	socket.syncUpdates('rogue', $scope.myrogues);
  });
$scope.data2 = [];



  $scope.addRogue = function() {
  	if ($scope.newRogue === '') {
  		return;
  	}
  	$http.post('/api/rogues', { name: $scope.newRogue, userid: $scope.currentuserid });
  	$scope.newRogue = '';
  };
  $scope.showDetails = function(Rogue){
  	$scope.showEditForm = 1;
    $scope.showRogues = 0;
  	$scope.currentRogue = Rogue;
  };
  $scope.saveRogue = function(Rogue){
    $scope.showRogues = 1;
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
      $scope.currentRogueReadings = response.data
      console.log(currentRogueReadings);
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
    $scope.data2 = [];
    $scope.showGraph = 0;
    $scope.currentRogueReadings = [];
    $scope.currentRogueReadingsTemp = [];
    $scope.selectedReadingOption = {sensorname: 'MCP9808'};
	};
  $scope.searchReadings = function(){
      $scope.currentRogueReadingsTemp = $filter('filter')($scope.currentRogueReadings, { rogueid: $scope.currentRogueID, datatype: $scope.selectedReadingOption.name });
      $scope.selectedUnit = $scope.selectedReadingOption.unit;
      $scope.populateGraph($scope.currentRogueReadingsTemp);
      $scope.showGraph = 1;
      socket.syncUpdates('reading', $scope.currentRogueReadingsTemp);
  };
  $scope.blinkLights = function(rogue){
    socket.blinkLights(rogue);
  };
  $scope.deleteRogue = function(rogue){
    $http.delete('/api/rogues/' + rogue._id);
  };
  $scope.populateGraph = function(currentRogueReadings){
    //console.log(currentRogueReadings);
    $scope.options = {
  axes: {x: {type: "date"}},
  series: [
    {
      y: "value",
      label: "Currently viewing a time series with: " + $scope.selectedUnit + " units",
      color: "#9467bd"
    }
  ],
  tooltip: {
    mode: "none",
    
  }
};
    $scope.data2 = [];
    angular.forEach(currentRogueReadings, function(obj){
       var tempdata = {x: new Date(), value: 3};
       tempdata.x = obj.timestamp;
       tempdata.value = obj.value;
       $scope.data2.push(tempdata);
    });
    $scope.data2.forEach(function(row) {
    row.x = new Date(row.x);
    console.log(row.x);
  });

  };
  $scope.onToggle = function(d, i, visible){
    console.log(d, i, visible);
  };
  $scope.$on('$destroy', function() {
      socket.unsyncUpdates('rogue');
    });

});