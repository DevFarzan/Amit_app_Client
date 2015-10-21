// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var chatAppModule = angular.module('chatAppModule', [

    'ionic',
    'ngCordova',
    'ngCookies'

]);

chatAppModule.run(function($ionicPlatform,$rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
chatAppModule.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider

      .state('login',{
        cache: true,
        url:'/',
        controller:'loginController',
        templateUrl:'templates/login.html'
      })

      .state('appUser',{
          url:'/appUser',
          controller:'appUserListController',
          templateUrl:'templates/appUserList.html'
      })

      .state('signUp',{
        cache: false,
        url:'/signUp',
        controller:'signUpController',
        templateUrl:'templates/signUp.html'

      })
      .state('newPassword',{
          url:'/newPassword/:randomID',
          controller:'changePasswordController',
          templateUrl:'templates/changePassword.html'
      })

      .state('welcomePage',{
          url:'/welcomePage',
          controller:'loginController',
          templateUrl:'templates/Welcome.html'
      })
      .state('resetPassword',{
          url:'/resetPassword',
          controller:'resetPasswordController',
          templateUrl:'templates/resetPassword.html'
      })
      .state('getUser',{
        url:'/getUser',
        controller:'listUserController',
        templateUrl:'templates/UsersList.html'
    })
      .state('term&services',{
          url:'/termServices',
          controller:'signUpController',
          templateUrl:'templates/term&services.html'
      })

      .state('inviteFriend',{
          url:'/invitefriend',
          templateUrl:'templates/inviteFriend.html'
      })
      .state('invitebyEmail',{
          url:'/invitebyemail',
          controller:'inviteFriendController',
          templateUrl:'templates/inviteByEmail.html'
      })
      .state('invitebynumber',{
          url:'/invitebynumber',
          controller:'inviteFriendController',
          templateUrl:'templates/inviteByNumber.html'
      })
      .state('contactus',{
          url:'/contactus',
          templateUrl:'templates/contactUs.html'
      })
      .state('aboutUs',{
          url:'/aboutUs',
          controller:'signUpController',
          templateUrl:'templates/aboutUs.html'
      })
      .state('contactUsE',{
          url:'/contactUsE',
          templateUrl:'templates/contactUsE.html'
      })
      .state('addressList',{
          url:'/addresslist',
          controller:'addressListController',
          templateUrl:'templates/AddressList.html'
      })
      .state('chat',{
          url:'/chat',
          controller:'chatController',
          templateUrl:'templates/chat.html'
      })
      .state('forgetpassword',{
          url:'/forgetpassword',
          controller:'forgotPasswordController',
          templateUrl:'templates/forgetpassword.html'
      })
      .state('paypal',{
          url:'/paypal',
          templateUrl:'templates/paypalLogin.html'

      })
      .state('carDetail',{
          url:'/cardDetails',
          templateUrl:'templates/cardDetail.html'
      })
      .state('paymentConformation',{
          url:'/paymentConfirm',
          templateUrl:'templates/paymentConfirmation.html'
      })
      .state('addBalance',{
        url:'/addbalance',
        templateUrl:'templates/addBalance.html'
    })
      .state('verifyCode',{
        url:'/verifyCode',
        controller:'verifyCodeController',
        templateUrl:'templates/verify code.html'
      })
      .state('Profile',{
          url:'/profile',
          controller:'profileController',
          templateUrl:'templates/profile.html'
      })


})
    .constant("myConfig", {
        "urlServer": "https://glacial-sands-5079.herokuapp.com",
        "urlLocal": "http://localhost:8000"
    });
