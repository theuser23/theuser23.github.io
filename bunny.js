var bunnyProject = angular.module('bunnyProject', []);
bunnyProject.controller('bunnyController', function($scope) {
	$scope.things = ["Watch You're the Worst", "Watch Crazy Ex-Girlfriend", "Call Mom", "Cry", "Study"];
	$scope.clickMe = function() {
	$scope.randomThing = $scope.things[Math.floor(Math.random() * 5)];
	}
});
