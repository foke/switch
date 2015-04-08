angular.module('switchApp').controller('mainController', function ($scope, lampService, featureFlagService) {
    // set scope vars
    $scope.serverError = false;
    $scope.lampList = JSON.parse(localStorage.getItem('lampList')) || [];

    // get feature flags
    featureFlagService.fetchFlags().then(function (data) {
        $scope.featureFlags = data;
    });
    
    // get list 
    lampService.fetchLamps().then(function (data) {      
        $scope.serverError = false;           
      
        $scope.lampList = data;            
        localStorage.setItem('lampList', JSON.stringify(data));    
    }, function (/*error*/) {
        $scope.serverError = true; 

        //$scope.lampList = [{'name':'hej dummy', 'id':'1'}, {'name':'hej2 dummy', 'id':'1'}];
    });  

    $scope.onDelete = function (data) {
        lampService
            .deleteLamp( data.id )
            .then(function (/*success*/) { 
                $scope.serverError = false; 
            },function (/*error*/) { 
                $scope.serverError = true; 
            });
    };


    // send requests on clicks!
    $scope.switchLamp = function (data) {        	
		lampService
            .switchLamp( data.action, data.id )
            .then(function (/*success*/) { 
                $scope.serverError = false; 
            },function (/*error*/) { 
                $scope.serverError = true; 
            });
	};
});