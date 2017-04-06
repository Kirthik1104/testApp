'use strict';

angular.module('app')
.controller('courseDetailctrl', function ($scope,$http, courseFactory, $state, $rootScope, UserFactory) {
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


$scope.searchCourseLesson = function() {
      $scope.courseid = localStorage.getItem("courseid")
      $http({
        url: 'http://localhost:3001/api/lesson',
        method: 'GET',
        params: {courseid: $scope.courseid}
      }).then(function(response) {                                
         $scope.lessons = response.data.lessons.filtarray;
      }, function(error) {
        alert(error.message);
      });  
}

$scope.searchCoursebyID = function() {
      $scope.courseid = localStorage.getItem("courseid")
      $http({
        url: 'http://localhost:3001/api/getsinglecourse',
        method: 'GET',
        params: {courseid: $scope.courseid}
      }).then(function(response) {                                
         $scope.course = response.data.course;
      }, function(error) {
        alert(error.message);
      });  
}

function handleError() {
  alert("error");
}

$scope.searchCourseLesson();
$scope.searchCoursebyID();

$scope.playvideo = function(videoid){
  plyr.get().forEach(function(instance) { 
    instance.destroy();
  });
  angular.element("#plyr").attr("data-video-id", videoid);
  plyr.setup()[0];
  //plar.destroyed()
}


});