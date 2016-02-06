'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'angular-md5',
    'myApp.config',
    'myApp.users',
    'myApp.login',
    'myApp.account'
])

.factory("Auth", ["$firebaseAuth", "furl",
    function($firebaseAuth, furl) {
        var ref = new Firebase(furl);
        return $firebaseAuth(ref);
    }
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/login'
    });
}])



.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location) {

    // track status of authentication
    Auth.$onAuth(function(user) {
        $rootScope.loggedIn = !!user;
        console.log("Logged In: " + $rootScope.loggedIn);
    });

    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });

    $rootScope.$on("$routeChangeSuccess", function(event, next, previous, error) {
       
 // Load the Footer after other content
        setTimeout(function() {
            $(".footer").show();
        }, 1000);
    });

}]);
