var project = angular.module('project', []); 
	project.controller('appController', function($scope, $http) {
		var summonerID = 67093044;
		$scope.sumName = "";
		$scope.name = 'joe';
		
		
	$scope.clicked = function() {
		$http.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + $scope.sumName + "?api_key=RGAPI-C5BE8D32-0997-4B3D-8204-F1BA9357BF37")
		.then(function(response) {
			$scope.sumId = response.data[$scope.sumName].id;
			var summId = $scope.sumId.toString();
		}, function(response) {
			$scope.myWelcome = response.statusText;
		});
		$http.get("https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + $scope.sumId + "?api_key=RGAPI-C5BE8D32-0997-4B3D-8204-F1BA9357BF37")
    .then(function(response) {
        $scope.datas = response.data[$scope.sumId][0].tier.toLowerCase();
		if ($scope.datas == 'silver' || $scope.datas == 'bronze' || $scope.datas == 'gold') {
			$scope.names = 'a scrub';
		} else if ($scope.datas == 'platinum' || $scope.datas == 'diamond') {
			$scope.names = 'not a scrub';
		} else {
			$scope.names = "";
		}
		$scope.myStatus = response.status;
    }, function(response) {
		$scope.myWelcome = response.statusText;
	});
	};
	

		
	});
