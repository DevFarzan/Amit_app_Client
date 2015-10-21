chatAppModule.controller('loginController',function($scope,$state,$http,$ionicPopup,$ionicSideMenuDelegate,myConfig,$rootScope,$cordovaOauth,Login,$ionicLoading) {


    $scope.usernameID = '';
    $scope.loginData = {};
    $scope.listUser = [];
    $scope.Loc = '';
    $scope.location = '';


    Login.getUserLocation();

    $scope.backforget = function(){
        history.back();
    };
    var show = function() {
        $ionicLoading.show({
            template:'<div class="spinner">'+
            '<div class="rect1"></div>'+
            '<div class="rect2"></div>'+
            '<div class="rect3"></div>'+
            '<div class="rect4"></div>'+
            '<div class="rect5"></div>'+
            ' </div>'
        });
    };
    var hide = function(){
        $ionicLoading.hide();
    };

    //local Own login

    $scope.doLogin = function () {

        if ($scope.loginData.Username  &&  $scope.loginData.Password  ) {
            show();
            $http.post(myConfig.urlServer +'/signIn', {
                loginData: $scope.loginData
            }).success(function (response) {
                if (response.data.length == 0) {
                    $ionicPopup.alert({template:'this users does not exit'})
                }
                hide();
                localStorage.setItem('sessionCode',response.data[0].sessionCode);
                console.log(response.data[0].sessionCode);
                console.log(response);
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log(position.coords.latitude + ',' + position.coords.longitude);
                    var _loc=position.coords.latitude + ',' + position.coords.longitude;
                    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + localStorage.getItem(_loc) + '&key=AIzaSyDhMPFM50yo4Is2afbhqgStOWTPULLr0F8', {}).success(function (response) {
                        localStorage.setItem('location', response.results[0].formatted_address);
                        $scope.location = response.results[0].formatted_address;
                        //localStorage.setItem('Location',response.results[0].formatted_address);
                        $http.post(myConfig.urlServer + '/loginDetail', {
                            usernameID: localStorage.getItem('currentUser'),
                            Loc: $scope.location
                        }).success(function (response) {
                            $scope.usernameID = localStorage.getItem('currentUser');
                            //console.log(response);
                            $scope.location = '';
                        }).error(function (err) {
                            console.log(err);
                            hide();
                        });
                    }).error(function (err) {
                        console.log(err);
                        hide();
                    });
                }, function (error) {
                }, {enableHighAccuracy: true, maximumAge: 0});
                if (response.data[0].userName == 'Admin') {
                    localStorage.setItem('currentUser', response.data[0].userName);
                    $state.go('appUser');
                    hide();
                }
                else {
                    if (response.data.length != 0) {
                        $scope.loginData = '';
                        if (response.data[0].code_Verified == false) {
                            $ionicPopup.alert({
                                template: 'you are not a verify user first verify your email'
                            })
                            hide();
                        }
                        else if (response.data[0].code_Verified == true) {
                            $state.go('chat');
                            hide();
                        }
                        console.log(response);

                        localStorage.setItem('currentUser', response.data[0].userName);
                        $scope.username = localStorage.getItem('currentUser');
                        console.log($scope.username);
                        localStorage.setItem('userID', response.data[0]._id);
                        localStorage.setItem('userFriend', 'Admin')
                    }
                    else {
                        $ionicPopup.alert({
                            template: 'username incorrect'
                        })
                    }
                }
            }).error(function (err) {
                console.log(err);
                hide();
            });


        }
        else{
            $ionicPopup.alert({
                template:'Fill the fields first'
            });
        }
    };


    $scope.getUser = function(){
        show();
        $http.post(myConfig.urlServer+'/getUser',{
        }).success(function(data){
            console.log(data);
            hide();
            $scope.listUser = data;
            console.log($scope.listUser);
        }).error(function(err){
            console.log(err);
        })
    }

//logout function

    //Facebook builtin function
    var fbLoginSuccess = function(response) {
        if (!response.authResponse){
            fbLoginError("Cannot find the authResponse");
            return;
        }
        var expDate = new Date(
            new Date().getTime() + response.authResponse.expiresIn * 1000
        ).toISOString();

        var authData = {
            id: String(response.authResponse.userID),
            access_token: response.authResponse.accessToken,
            expiration_date: expDate
        };

        fbLoginSuccess = null;
        console.log(response);
        facebookConnectPlugin.api('/me', null,
            function (response) {
                console.log(response);
                 $state.go('chat');
            },
            function(error) {
                console.log(error);

            })

    };

    var fbLoginError = function(error){
        console.log(error);
    };

    $scope.login = function() {

        if (!window.cordova) {
            facebookConnectPlugin.browserInit('463077207199063');
        }
        /*facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);

         fbLogged.then( function(authData) {
         console.log('Promised');

         })
         .then( function(userObject) {
         var authData = userObject.get('authData');
         facebookConnectPlugin.api('/me', null,
         function (response) {
         console.log(response);
         })
         })*/
        facebookConnectPlugin.login(["email"],
            fbLoginSuccess,
            function (error) {
            }
        );

    };

    $scope.logout = function() {
        localStorage.clear();
        $state.go('login');
    };

});
