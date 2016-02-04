var app = angular.module('app', ['ui.router']);

app.controller('appController', function ($scope) {

});

app.controller('loginController', function ($scope, $state) {
	
});

var socket = io();
var currentUser = false;