'use strict';

var switchApp = angular.module('switchApp', ['ngRoute', 'ngTouch']);

// configure our routes
switchApp.config(function($routeProvider) {

    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/config', {
            templateUrl : 'config.html',
            controller  : 'configController'
        });
});
