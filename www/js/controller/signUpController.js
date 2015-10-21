chatAppModule.controller('signUpController',function($scope,$http,$state,myConfig,$ionicPopup){

    $scope.signUpData={};
    $scope.signUpData.userName = '';

    $scope.termServices = function(){
        $state.go('term&services');
    };
    $scope.backTerm = function(){
        history.back();
    };

   /* $scope.validate = function(evt) {

        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            $scope.signUpData.PhoneNumber.lastIndexOf()
            $scope.signUpData.PhoneNumber="";

            return false;

        return true;


    };*/

    $scope.AboutUs = function(){
      history.back();
    };


    $scope.signUpUser = function() {

        if($scope.signUpData.email.search('@')==-1){

            $scope.emailValid=true;

            $scope.usernameEmpty=false;
            $scope.usernameGreater=false;
            $scope.usernameGreaterThanFive=false;
            $scope.passwordEmpty=false;
            $scope.passwordGreater=false;
            $scope.passwordGreaterThanFive=false;

        }

        else if($scope.signUpData.userName=='')
        {
            $scope.emailValid=false;
            $scope.usernameGreater=false;
            $scope.usernameGreaterThanFive=false;
            $scope.passwordEmpty=false;
            $scope.passwordGreater=false;
            $scope.passwordGreaterThanFive=false;

            $scope.usernameEmpty=true;

            //console.log($scope.usernameEmpty);

        }


        else if($scope.signUpData.userName.length > 20){
            $scope.usernameGreater=true;

            $scope.usernameEmpty=false;
            $scope.emailValid=false;
            $scope.usernameGreaterThanFive=false;
            $scope.passwordEmpty=false;
            $scope.passwordGreater=false;
            $scope.passwordGreaterThanFive=false;


        }
        else if($scope.signUpData.userName.length <= 5 && $scope.signUpData.userName.length > 0){
            $scope.usernameGreaterThanFive=true;

            $scope.usernameEmpty=false;
            $scope.emailValid=false;
            $scope.passwordEmpty=false;
            $scope.passwordGreater=false;
            $scope.passwordGreaterThanFive=false;
            $scope.usernameGreater=false;


        }
        else if($scope.signUpData.password.length==''){
            $scope.passwordEmpty=true;

            $scope.usernameGreaterThanFive=false;

            $scope.usernameEmpty=false;
            $scope.emailValid=false;

            $scope.passwordGreater=false;
            $scope.passwordGreaterThanFive=false;
            $scope.usernameGreater=false;


        }
        else if($scope.signUpData.password.length < 8 && $scope.signUpData.password.length > 0){
            $scope.passwordGreater=true;

            $scope.usernameGreaterThanFive=false;
            $scope.usernameEmpty=false;
            $scope.emailValid=false;
            $scope.passwordEmpty=false;
            $scope.passwordGreaterThanFive=false;
            $scope.usernameGreater=false;


        }
        else if($scope.signUpData.password.length < 8 ){
            $scope.passwordGreaterThanFive=true;

            $scope.passwordGreater=false;
            $scope.usernameGreaterThanFive=false;
            $scope.usernameEmpty=false;
            $scope.emailValid=false;
            $scope.passwordEmpty=false;
            $scope.usernameGreater=false;
        }


        else {


            $http.post(myConfig.urlLocal + '/signUp', {
                signUpData: $scope.signUpData
            }).success(function (response) {
                console.log(response);
                $scope.signUpData = '';
                $scope.code = localStorage.setItem('verifyCode', response.data.verifyCode);
                if (response.err != null) {
                    alert('username field already exist');
                }
                else {
                    $state.go('verifyCode');
                }


            }).error(function (err) {
                console.log(err)
            });
        }
    }


});
