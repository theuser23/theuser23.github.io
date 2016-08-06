

var project = angular.module('projectApp', []);
	project.controller('appController', function($location) {
		this.myUrl = $location.absUrl();
  

		this.firstName = 'Erik';
		this.lastName = 'Langford';	
		this.count = 0;
		this.goslingNum = Math.floor(Math.random()  * 3);
		this.goslings = [
		'http://marieclaire.media.ipcdigital.co.uk/11116/00006aa75/7180_orh100000w440/ryan-gosling-garticle.jpg',
		'http://img2.timeinc.net/people/i/2010/database/100531/ryan-gosling-300.jpg',
		'https://girlslikegiants.files.wordpress.com/2012/02/600full-ryan-gosling1.jpg'
		];
		this.randomNum = this.goslings[this.goslingNum];
		this.clicked = function() {
			this.count++;
			this.goslingNum++;
			if (this.count > 14) {
			this.firstName = 'Robert';
		} else {
			this.firstName = 'Erik';
		}
		}
		this.thing = 'false';
		this.yesClicked = function() {
			if (this.thing = 'false') {
				this.thing = 'true';
			} 
		}
		
	});
