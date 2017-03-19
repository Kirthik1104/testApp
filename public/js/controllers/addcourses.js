'use strict';

angular.module('app')
.controller('addCourse', function ($scope, courseFactory, $state, $rootScope, UserFactory) {
	$scope.course = {};
	
	$scope.submit = function() {
	  $scope.course.description =  angular.element(".note-editable").html();
      courseFactory.createNewCourse($scope.course).then(function success(response) {
      }, handleError);
    }
    
    function handleError() {
    	alert("error");
    }
});