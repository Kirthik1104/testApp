'use strict';

angular.module('app')
.controller('addCourse', function ($scope,$http, courseFactory, $state, $rootScope, UserFactory) {
 var htmlClass = {
  website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
  websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
  websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
  websiteLogin: 'hide-sidebar ls-bottom-footer',
  websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
  appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
  appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
};

$scope.app.settings.htmlClass = htmlClass.appl3;
$scope.app.settings.bodyClass = '';
$rootScope.menuStudent = false;
$rootScope.loginPage = true;

$scope.course = {};

$scope.submit = function() {
  $scope.course.description =  angular.element(".note-editable").html();
  courseFactory.createNewCourse($scope.course).then(function success(response) {
    sessionStorage.setItem("courseid", response.data._id);

  }, handleError);
}

$scope.addLesson = function() {
      $scope.lesson.courseid = sessionStorage.getItem("courseid")
      $http({
        url: 'http://localhost:3001/api/lesson',
        method: 'POST',
        data: $scope.lesson
      }).then(function(response) {                                
         alert("updated sucessfully");
      }, function(error) {
        alert(error.message);
      });
  
}

function handleError() {
  alert("error");
}

});