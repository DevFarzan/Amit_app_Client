chatAppModule.controller('chatController',function($scope,$http,$state,myConfig,$ionicScrollDelegate,$rootScope,$ionicLoading){

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
    $scope.SessionCode = localStorage.getItem('sessionCode');
    $scope.username = localStorage.getItem('currentUser');
   var d = new Date();
    $rootScope.username = localStorage.getItem('currentUser');
    $rootScope.userLocation = localStorage.getItem('location');
   if(localStorage.getItem('currentUser')=='Admin'){

       $scope.userChatName = localStorage.getItem('userFriend');
       $scope.ShowNavBar = false;
   }
    else{
       $scope.userChatName = localStorage.getItem('currentUser');
   }
    $scope.currentUser=localStorage.getItem('currentUser');
    $scope.userFriend=localStorage.getItem('userFriend');

    //check SessionStorage
    /*$http.post(myConfig.urlLocal+'/SessionStorageId',{
        SessionCode:localStorage.getItem('sessionCode'),
        username:localStorage.getItem('currentUser')
    }).success(function(response){
        if(response == "OK"){*/

    $scope.userID = localStorage.getItem('userID');
    $scope.chatMessageArray = [];
    $scope.chatMessage = {

        message: '',
        author: ''

    };
show();

    $http.post(myConfig.urlServer+'/getChatMessage',{
        userChatName:$scope.userChatName
    }).success(function(response){
        hide();
        if(response.data[0] == undefined){
            $scope.chatMessageArray = [];
        }
        else {
            $scope.chatMessageArray = response.data[0].chatMessage;
        }
        console.log(response);
    }).error(function(err){
        console.log(err);
    });


    var  socket = io.connect(myConfig.urlServer);

    $scope.chatmessage = '';


    $scope.chatMesage = function() {
        //$scope.chatMessageArray.push($scope.chatmessage);
        socket.emit('chat message', $scope.chatmessage , $scope.currentUser);
    };

    socket.on('chat message',function(msg , sendingUser){
        $scope.chatMessage = {

            message: msg,
            author: sendingUser,
            time: d.getHours() + ':' + d.getMinutes(),
            date: d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()

        };


        $scope.chatMessageArray.push($scope.chatMessage);
        $scope.$apply($scope.chatMessageArray);
        $scope.chatmessage = '';

        $ionicScrollDelegate.scrollBottom(true);
           show();
        $http.post(myConfig.urlServer+'/chatMessage',{
            chatmesage: $scope.chatMessageArray,
            userChatName:$scope.userChatName,
            userID:$scope.userID

        }).success(function(response){
            hide();
            if(response.err.message == 'Validation failed') {

                $http.post(myConfig.urlServer+'/updatedMessage', {
                    userChatName: $scope.userChatName+'Admin',
                    chatmesage: $scope.chatMessageArray
                }).success(function (response) {
                    hide();
                    console.log(response);
                }).error(function (err) {
                    console.log(err);
                });
            }
            console.log(response);
            //update message API




        }).error(function(err){
            console.log(err);
            hide();
        });


    });

    if( localStorage.getItem('username') == 'Admin'){


    }
    else {

        $http.post(myConfig.urlServer+'/chatRoom', {
            userChatName: $scope.userChatName

        }).success(function (response) {
            console.log(response);
            hide();
        }).error(function (err) {
            console.log(err);
            hide();
        });

    }





    /*chat message API */

   /* $scope.messages = function(){

        $http.post(myConfig.urlLocal+'/chatMessage',{
        chatmesage:$scope.chatmessage,
        userChatName:$scope.userChatName,
        userID:$scope.userID

        }).success(function(response){
            console.log(response);
            $scope.chatMessageArray = response.data.chatMessage;
            $scope.chatmessage='';
           $scope.chatMessageArray = '';
        }).error(function(err){
            console.log(err);
        });
    }*/
    /*}
        else{
            $state.go('login');
            localStorage.clear();
        }

    });*/
    $scope.logout = function() {
        localStorage.clear();
        $state.go('login');
    };
});