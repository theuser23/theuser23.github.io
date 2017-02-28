var level2State = {


create: function () {
  //Weight
  this.weight = 20;
  this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  //Map
  this.map = game.add.tilemap('secondLevel');
  this.map.addTilesetImage('tiles', 'tileset');
  this.backgroundLayer = this.map.createLayer('backgroundLayer');
  this.blockedLayer = this.map.createLayer('blockedLayer');

  this.backgroundLayer.resizeWorld();
    this.map.setCollisionBetween(0, 10000, true, this.blockedLayer);
  //Start up keyboard
  this.keyboard = game.input.keyboard;

  //song
  this.music = game.add.audio('gameMusic');
  this.music.play();
  this.music.volume = 0.7;


	game.physics.startSystem(Phaser.Physics.ARCADE);



	this.player = game.add.sprite(85, game.world.height - 500, 'sprite');

	game.physics.arcade.enable(this.player);
	game.camera.follow(this.player);

	this.player.body.gravity.y = 100;
	this.player.body.collideWorldBounds = true;

  //Animations

	this.player.animations.add('left', [2,3], 10, true);
	this.player.animations.add('right', [0,1], 10, true);


  //Items
  this.doors = game.add.group();
  this.doors.enableBody = true;
  this.door = this.doors.create(1300, game.world.height - 200, 'door');

	this.stars = game.add.group();
	this.stars.enableBody = true;
	for (var i = 0; i < 5; i++) {
     this.treat = this.stars.create(Math.random() * 1600, game.world.height - 300, 'treat');
	   this.treat.scale.setTo(.25, .25);
     this.treat.body.gravity.y = 50;
   }

	this.cursors = game.input.keyboard.createCursorKeys();

	this.weightText = game.add.text(16, 16, 'Weight: ' + this.weight + ' lbs', { fontSize: '32px', fill: '#ffffff' });
	this.weightText.fixedToCamera = true;
	this.weightText.cameraOffset.setTo(16, 16);

	//audio

	this.meow = game.add.audio('meow');

 	game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);


},

updateCounter: function () {
if (this.weight > 0) {
  this.weight -= 1;
}
},

collectTreat: function (player, treat){
  treat.kill();
  this.meow.play('', 2);
  this.weight += 1;
},

nextLevel: function() {
  game.state.start('lose');
},

update: function () {
	if (this.weight < 5 || this.weight == 5) {
		this.player.body.gravity.y = 50;
	} else {
		this.player.body.gravity.y = this.weight * 50;
	}


	game.physics.arcade.collide(this.stars, this.blockedLayer);
  var hitPlatform = game.physics.arcade.collide(this.player, this.blockedLayer);



game.physics.arcade.overlap(this.player, this.stars, this.collectTreat, null, this);
  game.physics.arcade.overlap(this.player, this.doors, this.nextLevel, null, this);

this.weightText.text = 'Weight: ' + this.weight + ' lbs';


	if (this.weight == 0 || this.weight < 0) {
    game.time.events.add(Phaser.Timer.SECOND * 3, this.loseScreen, this);
	}

	//  Reset the players velocity (movement)
this.player.body.velocity.x = 0;

if (this.cursors.left.isDown && this.weight > 0)
{
		//  Move to the left
		this.player.body.velocity.x = -150;

		this.player.animations.play('left');

}
else if (this.cursors.right.isDown && this.weight > 0)
{
		//  Move to the right
		this.player.body.velocity.x = 150;

		this.player.animations.play('right');

}
else if (this.weight == 0 || this.weight < 0) {
  this.player.animations.stop();
  this.player.frame = 4;
}
else {
  this.player.animations.stop();
  this.player.frame = 0;
}

//  Allow the player to jump if they are touching the ground.
if (hitPlatform && this.weight > 0)
{
	this.space.onDown.addOnce(this.jump, this);
}

if (this.cursors.up.isDown && this.weight < 6) {
	this.player.body.velocity.y = -50;
}



},

jump: function() {
  this.player.body.velocity.y = -400;
},

loseScreen: function() {
  game.state.start('lose');
}
};
