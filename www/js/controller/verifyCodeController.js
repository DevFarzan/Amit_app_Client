chatAppModule.controller('verifyCodeController',function($scope,$http,$state,myConfig,$ionicPopup,$ionicLoading){
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


    $scope.userCode = {};

    $scope.userID=localStorage.getItem('userID');
    $scope.code = localStorage.getItem('verifyCode');

    $scope.popUp=function(){
        $ionicPopup.alert({
            title:'Warning',
            template:'you are not a verify user check your email and first verify a code'
        });
    };

    $scope.verifyCode = function() {
      show();
        $http.post(myConfig.urlServer+'/verifyCode', {
            userCode: $scope.userCode,
            userID:$scope.userID,
            code:$scope.code

        }).success(function (response) {
            hide();
            console.log(response);

            if(response == 'success') {
                $scope.userCode = {};
                $state.go('login');
            }

            else{
                $ionicPopup.alert({
                    title:'Warning',
                    template:'your code is not valid please write valid code'
                });
            }
        }).error(function (err) {
            hide();
            console.log(err);
        })

    }

});