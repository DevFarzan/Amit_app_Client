chatAppModule.controller('appUserListController',function($scope,$state,$http,$ionicPopup,$ionicSideMenuDelegate,myConfig) {
    $scope.userList = [];
    $scope.user = '';

    $http.post(myConfig.urlServer+'/getUser',{

    }).success(function(response){
        console.log(response);
        $scope.userList = response.data
    }).error(function(err){
       console.log(err);
    });

    $scope.chatRoom = function(user){
       console.log(user.userName);
        $scope.userChatName = user.userName;
        localStorage.setItem('userFriend',user.userName);

        $http.post(myConfig.urlLocal+'/chatRoom',{
            userChatName:$scope.userChatName
        }).success(function (response) {

            /*if(response.err.message == 'Validation failed'){
                $http.post(myConfig.urlLocal +'/getChatMessage',{
                    userChatName:$scope.userChatName
                }).success(function(response){
                    $state.go('chat');
                    console.log(response);
                }).error(function(err){
                    console.log(err)
                });

            }*/
            $state.go('chat');
            console.log(response);



        }).error(function (err) {
            console.log(err);
        });

    };

});