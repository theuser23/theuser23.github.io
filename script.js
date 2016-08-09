var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

    // configure our routes
    myApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

		$stateProvider
            // route for the home page
            .state('home', {
				url: '/home',
                templateUrl : 'home.html',
                controller  : 'mainController'
            })
			
			.state('home.kitty', {
				url: '/kitty',
				templateUrl: 'home-kitty.html',
				controller: function($scope) {
					$scope.kitties = ['Dillinger', 'Peter', 'Cookie', 'Snowbelle'];
				}
			})

            // route for the about page
            .state('about', {
				url: '/about',
                templateUrl : 'about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .state('contact', {
				url: '/contact',
                templateUrl : 'contact.html',
                controller  : 'contactController'
            })
			
			.state('LeagueApp', {
				url: '/leagueapp',
                templateUrl : 'league.html',
                controller  : 'leagueController'
            })
			
			.state('bunny', {
				url: '/katrina',
                templateUrl: 'bunny.html',
                controller: 'bunnyController'
            });
    });

    // create the controller and inject Angular's $scope
    myApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.name = 'Erik Langford';
		
		$scope.imgs = [
		'http://wfiles.brothersoft.com/c/cat-wallpaper_195981-1280x720.jpg', 
		'http://wfiles.brothersoft.com/c/cat-wallpaper_195819-1280x720.jpg',
		'http://www.mrwallpaper.com/wallpapers/cute-kitty-cat-1280x720.jpg'
		];
		
 




    });

    myApp.controller('aboutController', function($scope) {
        $scope.message = "I also don't know what to write here";
    });

    myApp.controller('contactController', function($scope) {
        $scope.message = 'There is nothing here yet';
    });
	
	myApp.controller('leagueController', function($scope, $http) {
		var summonerID = 67093044;
		$scope.sumName = "";
		$scope.name = 'platinum';
		
		
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
	
	myApp.controller('bunnyController', function($scope) {
	$scope.things = ["Wow, you're so beautiful!", 
					 "How can you possibly be so smart and so skinny?", 
					 "I'd like to break me off a piece of that kit-KAT bar", 
					 "You're a strong, independent woman!", 
					 "Wow, have you been going to the gym?",
					 "a",
					 "b",
					 "c",
					 "d",
					 "e",
					 "f"];
	
	$scope.clickMe = function() {
		$scope.randomThing = $scope.things[Math.floor(Math.random() * $scope.things.length)];
	};
	});
