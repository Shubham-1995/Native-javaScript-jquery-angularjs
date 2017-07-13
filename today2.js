var myApp = angular.module('myApp',[]);

myApp.directive('panelController', function() {
    return {
        restrict: "EA",
		templateUrl:"hello-world.html",
		controller: function(){
			this.name = "shubham";
			this.surname = "gaur";
		},
		controllerAs:'panels'
        
    }
});

myApp.controller('MyCtrl',function($scope) {
    $scope.$on("initialize", function(){
        alert("Link function has been initialized!");
    });
	$scope.firstname = "satyam";
	$scope.lastname = "gaur";
});

myApp.directive('abc', function() {
    return {
        restrict: "EA",
		templateUrl:"seenow.html",
    }
});