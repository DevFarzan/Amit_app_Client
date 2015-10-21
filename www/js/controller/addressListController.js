chatAppModule.controller('addressListController',function($scope,$state,$http,$ionicPopup,myConfig,$ionicLoading){


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



    $scope.showTextField = false;
    $scope.userID=localStorage.getItem('userID');
    $scope.userAddress = {};

    $scope.showTextBox = function(){
        $scope.showTextField = !$scope.showTextField;
    };

    $scope.hideTextBox = function(){
        $scope.hideTextField = false;
    };

    $scope.addressList = function() {
        show();
        $http.post(myConfig.urlServer+'/addressList',{
            userAddress: $scope.userAddress,
            userID: $scope.userID
        }).success(function (response) {
            hide();
            $scope.userAddress = '';
            console.log(response);
        }).error(function (err) {
            hide();
            console.log(err);
        })
    };
});