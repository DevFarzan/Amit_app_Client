chatAppModule.controller('inviteFriendController',function($scope,$state,$http,$ionicPopup,$ionicSideMenuDelegate,myConfig){

    localStorage.getItem('userID');
    localStorage.getItem('currentUser');
$scope.a ='';
    $scope.inviteFriendByEmail = [];

    $scope.inviteFriend = function() {

    for(var i=0;i<$scope.inviteFriendByEmail.length;i++){
        if($scope.inviteFriendByEmail[i]==""){
            $scope.inviteFriendByEmail.splice(i,1);
        }
    }


                $http.post(myConfig.urlServer + '/friendInvite', {

                    inviteFriendByEmail: $scope.inviteFriendByEmail,
                    UserID: localStorage.getItem('userID'),
                    currentUser: localStorage.getItem('currentUser')
                }).success(function (response) {
                    console.log(response);
                    $state.go('inviteFriend');
                }).error(function (err) {
                    console.log(err);
                });
                $scope.inviteFriendByEmail = [];
        }

});