'use strict';

angular.module('myApp.account', ['ngRoute', 'angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/account', {
        templateUrl: 'views/account/account.html',
        controller: 'AccountCtrl',
        resolve: {
            auth: ["Auth", function(Auth) {
                return Auth.$requireAuth();
            }],
            profile: ["Users", "Auth", function(Users, Auth) {
                return Auth.$requireAuth().then(function(auth) {
                    return Users.getProfile(auth.uid).$loaded();
                });
            }]
        }
    });
}])



.controller('AccountCtrl', ['$rootScope', '$scope', 'Auth', 'furl', '$location', 'profile', 'auth', 'Users', 'FileUploader', function($rootScope, $scope, Auth, furl, $location, profile, auth, Users, FileUploader) {

    $scope.profile = profile;
    $scope.users = Users.all;


//Saves any changes on Profile Page to Firebase
    $scope.updateProfile = function() {
        profile.$save();
    };

//Logs user out and returns them to login screen
       $scope.logout = function() {
        Auth.$unauth();
        $location.path('/login');
    };


    }]);
    


