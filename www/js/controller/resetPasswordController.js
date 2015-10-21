chatAppModule.controller('resetPasswordController',function($scope,$state,$http,$ionicPopup,myConfig,$ionicLoading) {

    //loading spinner code

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






    $scope.resetPassword = {};
    $scope.usernameLocal = '';


    $scope.resetUserPassword = function(){

        if($scope.resetPassword.newPassword == $scope.resetPassword.confirmPassword) {
            show();
            $http.post(myConfig.urlServer+'/resetPassword', {

                resetPassword: $scope.resetPassword,
                usernameLocal:localStorage.getItem('currentUser')

            }).success(function (response) {
                hide();
                if(response.data.n == 1){
                    $ionicPopup.alert({
                       title:'password changed',
                       template:'password changed now'
                    });
                }
                $scope.resetPassword = {};

            }).error(function (err) {
                hide();
                console.log(err);
            })
        }
        else{
            $ionicPopup.alert({
                template:'password not match'
            });
            hide();
        }
    };


    $scope.resetPasswordback = function(){
        show();
        history.back();
        hide();
    }
});