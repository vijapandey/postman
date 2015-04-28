'use strict';


app.controller('signupController', /*['$scope','$rootScope','$http',*/  function($scope, regService,Restangular,$location)
 {
    $scope.reset = function(user) {
        $scope.user = {};
       /* $scope.user.firstname = '';  $scope.user.lastname = '';
        $scope.user.emailaddress = ''; $scope.user.sex = '';
        $scope.user.country = '';  $scope.user.uploadimage = '';
        $scope.user.password='';   $scope.user.passwordverify='';*/
    };
     function init() {};
        $scope.signupSubmit=function(isValid){
         if (isValid) {
             console.log("controller call for Registering user  ");
             regService.registration($scope,$scope.user,Restangular,$location);
         }
         else{
             console.log("Error on  Registering user  ");
         }
     }

});

/*
app.controller('loginController',function($scope, $rootScope,loginService,Restangular,$alert, $auth,$location)
 {
     $scope.doLogin = function(isValid) {
         if (isValid) {
             console.log("controller call for Registering user  ");
             var loginResult=  loginService.login($scope,$scope.loginuser,Restangular,$alert, $auth,$location);

                 loginResult.then(function (loginResult) {

                 if (loginResult) {
                     $rootScope.isLogin=true;
                     //alert("1 @@@TRUE@ result :" +loginResult);
                 }else{
                     $rootScope.isLogin=false;
                     //alert("2 @@False@@ result :" +loginResult);
                 }
             });


         }
         else{
             console.log("Error on  Registering user  ");
         }

     };
    });*/

app.controller('loginController',
    ['$scope', '$rootScope', '$location', 'loginService','Restangular','$alert','$auth',
        function ($scope, $rootScope, $location, loginService,Restangular,$alert,$auth) {
            // reset login status
            loginService.ClearCredentials();

            $scope.doLogin = function (isValid) {
                $scope.dataLoading = true;
                loginService.Login($scope,$scope.loginuser,Restangular,$alert,$auth,$location, function (response) {

                    if (response) {
                        loginService.SetCredentials($scope.username, $scope.password);

                        $location.path('/resources');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };


        }]);

app.controller('logoutController', ['$scope', '$location', 'loginService','Restangular','$alert','$auth', function($scope, $location, loginService,Restangular,$alert,$auth) {
    console.log("Going for Signout");
    loginService.ClearCredentials();
}]);

app.controller('homeController', ['$scope','$http', function($scope,$http) {

    console.log("Welcome On Main Page ");
}]);