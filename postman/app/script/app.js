'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('messageApp', ['ngRoute','ngCookies','restangular','ngResource','ngMessages','ui.router','mgcrea.ngStrap', 'satellizer']);
/*
app.run(function ($rootScope) {
     $rootScope.loginusername =  "Welcome";
});
*/
// Using RestangularProvider we can configure properties. To check all properties go to https://github.com/mgonto/restangular
app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:8080/jmssender');
    RestangularProvider.setDefaultHttpFields({cache: true});
    RestangularProvider.setDefaultHeaders("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,authorization,client-security-token");
    RestangularProvider.setDefaultHeaders("Access-Control-Allow-Origin","*");
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    });
  /*  RestangularProvider.setDefaultHttpFields({
        'withCredentials': true
    });*/
});


app.config(['$routeProvider', function ($routeProvider, $urlRouterProvider, $authProvider,RestangularProvider) {

    $routeProvider.when('/newuser',
        {
            controller: 'signupController',
            templateUrl: 'user/newuser.html'
        })
        .when('/home',
        {
            controller: 'homeController',
            templateUrl: 'sitepage/homepage.html',data:{}
        })
        .when('/help',
        {
            templateUrl: 'sitepage/help.html'
        })
        .when('/donate',
        {
            templateUrl: 'sitepage/donate.html'
        })
        .when('/resources',
        {
            templateUrl: 'sitepage/resource.html'
        })
        .when('/contact',
        {
            templateUrl: 'sitepage/contactus.html'
        })
        .when('/login',
        {
            controller: 'loginController',
            templateUrl: 'user/login.html',

        })
        .when('/logout',
        {
            controller: 'logoutController',
            //templateUrl: null
            templateUrl: 'user/login.html',

        })
        .otherwise({redirectTo: '/home'});
}]);

/*app.run(function($rootScope) {
    $rootScope.isLogin=false;
    $rootScope.isAuthenticated = function() {
        console.log('hello');
        return $rootScope.isLogin;
    }
});
*/
app.run(['$rootScope', '$location', '$cookieStore', '$http','Restangular',
    function ($rootScope, $location, $cookieStore, $http,Restangular) {
        $rootScope.isLogin=false;

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
           // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
           // Restangular.setDefaultHeaders({'Authorization': 'Basic ' + authdata });
            Restangular.setDefaultHeaders({'Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata });
            Restangular.setDefaultHeaders("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,authorization,client-security-token");
            Restangular.setDefaultHeaders("Access-Control-Allow-Origin","*");
            Restangular.setDefaultHeaders("Access-Control-Allow-Methods","GET, POST","PUT","DELETE");


    }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in

            console.log("$location.path() ::::::::" +$location.path());
            if (($location.path() !== '/login' || $location.path() !== '/newuser')  && !$rootScope.globals.currentUser) {
                $location.path($location.path());
            }
            $rootScope.isAuthenticated=function(){

                if (!$rootScope.globals.currentUser) {
                    return false;
                }else{
                    return true;
                }
            }

        });
    }]);
