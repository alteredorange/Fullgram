'use strict';

angular.module('myApp.account', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'views/account/account.html',
    controller: 'AccountCtrl'
  });
}])

.controller('AccountCtrl', [function() {

}]);