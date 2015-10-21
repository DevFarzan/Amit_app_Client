chatAppModule.controller('changePasswordController',function($scope,$state,$http,$ionicPopup,myConfig) {

    $scope.location='';
    $scope.randomeToken={};
    $scope.changeUserPassword ={};



    $scope.updatePassword = function(){

   $scope.location=location.hash.split("/")[2];
        //alert($scope.location);

     if($scope.changeUserPassword.newUserPassword == $scope.changeUserPassword.confirmPassword) {

         $http.post(myConfig.urlServer+'/newPassword', {
             changeUserPassword: $scope.changeUserPassword,
             randomeToken:$scope.location
         }).success(function (data) {
             $state.go('login');
             console.log(data);
         }).error(function (err) {
             console.log(err);
         });
     }
        else{
         alert('password do not match');
     }
    }






});
