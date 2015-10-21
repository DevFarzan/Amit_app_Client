chatAppModule.controller('profileController',function($scope,$state,$http,$ionicPopup,myConfig,$cordovaCamera,$ionicModal,$ionicLoading) {

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



    $scope.userID = localStorage.getItem('userID');
    $scope.currentUserData = {};
    $scope.userNewName = '';
    $scope.Email = '';
    $scope.Gender = '';
    $scope.number= '';

    $scope.historyFunction  = function(){
        history.back();
    };
    $scope.resetLink = function(){
        $state.go('resetPassword');
    };

    $scope.aImages = [{

    }];

    //For profile picture
    document.addEventListener("deviceready", function () {


        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 150,
            targetHeight: 150,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            cameraDirection:1
        };


        $scope.addImage = function() {
            show();
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.image = document.getElementById('myImage');
                $scope.image.src = "data:image/jpeg;base64," + imageData;
                // alert($scope.image.src);

                $scope.aImages.push({'src':$scope.image.src, 'current':true});
               hide();

            }, function(err) {
                alert('Error:' + err);
            });
        };
    },false);



show();

    $http.post(myConfig.urlServer+'/UserProfile',{
        userID:$scope.userID
    }).success(function(response){
        hide();
        console.log(response);
        $scope.currentUserData = response;
        $scope.userNewName = $scope.currentUserData.userName;
        $scope.Email = $scope.currentUserData.email;
        $scope.Gender = $scope.currentUserData.userGender;
        $scope.number  = $scope.currentUserData.userPhoneNumber;
    }).error(function(err){
        console.log(err);
    });


   $scope.updateProfile = function(){
          show();
       $http.post(myConfig.urlServer+'/updateUserProfile',{
           userID:$scope.userID,
           userNewName: $scope.userNewName,
           Email:$scope.Email,
           Gender:$scope.Gender,
           number:$scope.number,
           ProfilePicture:$scope.aImages
       }).success(function(response){
           hide();
           console.log(response);
           if(response.data.n == 1){
               $ionicPopup.alert({
                   title:'Successfully updated ',
                  template:'Your data is updated'
               });
           }
       }).error(function(err){
           hide();
          console.log(err);
       });


   };



    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.browseImages=function(){
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.setProfilePic=function(index){
        // console.log($scope.aImages[index]);
        $scope.image.src=$scope.aImages[index].src;
        $scope.closeModal();

    };
});