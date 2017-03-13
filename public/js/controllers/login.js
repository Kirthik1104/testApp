'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, alert, $state, auth, $auth, $rootScope) {
    var htmlClass = {
                    website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
                    websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
                    websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
                    websiteLogin: 'hide-sidebar ls-bottom-footer',
                    websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
                    appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
                    appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
                };


    $scope.app.settings.htmlClass = htmlClass.websiteLogin;
    $scope.app.settings.bodyClass = 'login';
    $rootScope.loginPage = true;


    function handleError(err) {
      alert('warning', 'Something went wrong :(', err.message);
    }


    $scope.submit = function () {
      $auth.login({
        userName: $scope.userName,
        password: $scope.password
      }).then(function (res) {
        $rootScope.userName = res.data.userName;
        $rootScope.loginPage = true;
        res.data.userRole == "Student" ? $state.go('app-student.dashboard') :  $state.go('app-instructor.dashboard');
      }).catch(handleError);
    };


    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(function (res) {
        alert('success', 'Welcome', 'Thanks for coming back, ' + res.data.user.displayName + '!');
      })
        .error(handleError);
    };
  });
