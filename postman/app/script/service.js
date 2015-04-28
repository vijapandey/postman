'use strict';


//each doing the same thing just structuring the functions/data differently.
app.service('regService',function($http,$rootScope,Restangular) {

    this.registration = function ($scope,user,Restangular) {
    console.log("service  call for Registering user  "+user.emailaddress);
     var baseRegister = Restangular.all('registerUser');
     var param = $.param($scope.user);
        var  headers= {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                            'Accept':'application/json'
        }  // set the headers so angular passing info as form data (not request payload)
        console.log("service  call for baseRegister "+baseRegister   +"  " +param);
        // POST /registerUser
       baseRegister.post("/", $scope.user,headers).then(function(response) {
       $rootScope.message="user has been registered successfully ";
          $rootScope.loginusername=$scope.user.emailaddress;
           console.log("Successfully register user ");
        }, function(response) {
            console.log("There was an error saving");
        });




 /**  $http({
            method: 'POST',
            url: 'http://localhost:8080/jmssender/registerUser',
              data : $.param($scope.user),  // pass in data as strings
              headers: {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                     'Accept':'application/json'
                 }  // set the headers so angular passing info as form data (not request payload)
             }).success(function(data, status, headers, config) {

               $rootScope.message="user has been registered successfully ";
               //  $rootScope.loginusername=$scope.user.emailaddress;
                 console.log("Successfully register user ");
             }).error(function(data, status, headers, config) {
                 alert("###################### Failed  "+status );
             });**/

         };
});
/**
app.service('loginService',function($rootScope,Restangular,$alert, $auth,$location) {
    var userInfo;


    this.login = function ($scope,loginuser,Restangular,$alert, $auth,$location) {
        $scope.dataLoading = true;
        var login = Restangular.all('authenticate',function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
            next();
        });
        var loginResult=false;
        var  headers= {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Accept':'application/json'  }  // set the headers so angular passing info as form data (not request payload)
        console.log("service  call for baseRegister " +loginuser );
        return login.post("/", $scope.loginuser,headers).then(function(response) {
            //alert("response" +response );
            $alert({
                content: 'You have successfully logged in',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 5
            });
            $rootScope.loginusername=loginuser.emailaddress;
            $location.path('/resources');
            loginResult=true;
            return  response;

        }, function error(response) {
            $alert({
                content: 'issue in login please try again',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 7
            });
            $scope.error = response;
            $scope.dataLoading = false;
            loginResult=false;
            //alert("$$Service :loginResult:" +loginResult  +"#### response::"+response);
            return  response;
        });





    };

});
*/

/////////////////////////// New Ways
app.factory('loginService',  ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout','Restangular',
        function (Base64, $http, $cookieStore, $rootScope, $timeout,Restangular) {
            var service = {};

          service.Login = function ($scope,loginuser, Restangular,$alert,$auth,$location,callback) {

       /* Dummy authentication for testing, uses $timeout to simulate api call-----------*/

              $rootScope.dataLoading = true;
              Restangular.setFullResponse(true);
              var restAngular  = Restangular.withConfig(function(Configurer) {
                  Configurer.setBaseUrl('http://localhost:8080/jmssender');
                 // Configurer.setDefaultHeaders("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,authorization,client-security-token");
                  Configurer.setDefaultHeaders("Access-Control-Allow-Origin","*");

              });



              var login=restAngular.all('authenticate',function(req, res, next) {
                    res.header("Access-Control-Allow-Origin", "*");

                    res.header("Access-Control-Allow-Methods", "GET, POST","PUT","DELETE");
                    res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,authorization,client-security-token");
                  if ('OPTIONS' == req.method){
                      return res.send(200);
                  }
                  next();
                });

                var loginResult=false;
                var  headers= {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Accept':'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST,PUT', 'Access-Control-Allow-Headers':'X-Requested-With' }  // set the headers so angular passing info as form data (not request payload)
                console.log("service  call for baseRegister " +loginuser );
                 login.post("/", $rootScope.loginuser,headers).then(function(response) {
                    //alert("response" +response );
                    $alert({
                        content: 'You have successfully logged in',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 5
                    });
                    $rootScope.loginusername=loginuser.emailaddress;
                    $location.path('/resources');
                    loginResult=true;
                    callback(loginResult);
                   // return  response;

                }, function error(response) {
                    $alert({
                        content: 'issue in login please try again',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 7
                    });
                    $rootScope.error = response;
                    $rootScope.dataLoading = false;
                    loginResult=false;
                    //alert("$$Service :loginResult:" +loginResult  +"#### response::"+response);
                    callback(loginResult);
                   // return  response;
                });

            /*  $timeout(function () {
                    var response = { success: username === 'test' && password === 'test' };
                    if (!response.success) {
                        response.message = 'Username or password is incorrect';
                    }
                    callback(response);
                }, 1000);*/


                /* Use this for real authentication
                 ----------------------------------------------*/
                //$http.post('/api/authenticate', { username: username, password: password })
                //    .success(function (response) {
                //        callback(response);
                //    });

            };

            service.SetCredentials = function (username, password) {
                var authdata = Base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                };

                //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                Restangular.setDefaultHeaders({'Authorization': 'Basic ' + authdata });

                $cookieStore.put('globals', $rootScope.globals);
            };

            service.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
               // $http.defaults.headers.common.Authorization = 'Basic ';
                Restangular.setDefaultHeaders({'Authorization': 'Basic '  });
                console.log("Going for ClearCredentials");
            };

            return service;
        }]);



app.factory('Base64', function () {
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

    /* jshint ignore:end */
});