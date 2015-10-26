chatAppModule.controller('forgotPasswordController',function($scope,$state,$http,$ionicPopup,$ionicSideMenuDelegate,myConfig,$rootScope,$cordovaOauth) {

    $scope.recoverEmail={};

    $scope.backforget = function(){
        history.back();
    };


    $scope.sentEmail = function(){
        $http.post(myConfig.urlLocal+'/recoverPassword',{
            recoverEmail:$scope.recoverEmail
        }).success(function(data){

            $state.go('login');
        }).error(function(err){
            console.log(err);
        });
        $scope.recoverEmail={};

        $ionicPopup.alert({
            template:'We Have send a verification Code to your email kindly check It Thanks!'
        });
    };
});


