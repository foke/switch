switchApp.controller('configController', function ($scope) {
    $scope.server = localStorage.getItem('server') || 'localhost:3000';

    $scope.setServer = function () {                     
        localStorage.setItem('server', $scope.server);  
    };
});