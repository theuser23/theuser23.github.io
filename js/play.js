var playState = {


create: function () {
  //Weight
  this.weight = 20;
  this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  //Map
  this.map = game.add.tilemap('tiledMap');
  this.map.addTilesetImage('tiles', 'tileset');
  this.backgroundLayer = this.map.createLayer('backgroundLayer');
  this.blockedLayer = this.map.createLayer('blockedLayer');
  this.movingLayer = this.map.createLayer('movingLayer');



  this.backgroundLayer.resizeWorld();
    this.map.setCollisionBetween(0, 2000, true, this.blockedLayer);
    this.map.setCollisionBetween(0, 2000, true, this.movingLayer);

  //Start up keyboard
  this.keyboard = game.input.keyboard;

  //level

  this.content = "L E V E L O N E";
  this.letterIndex = 0;
  this.line = this.content.split(" ");
  this.levelText = game.add.text(330, 200,'', { font: "130px Bangers", fill: "#ffffff" });
  this.levelText.fixedToCamera = true;

  //song
  this.music = game.add.audio('gameMusic');
  this.music.play();
  this.music.volume = 0.7;


	game.physics.startSystem(Phaser.Physics.ARCADE);




	this.player = game.add.sprite(85, game.world.height - 300, 'sprite');

  this.hasOverlapped = false;
	game.physics.arcade.enable(this.player);
	game.camera.follow(this.player);

	this.player.body.gravity.y = 100;
	this.player.body.collideWorldBounds = true;

  //Animations

	this.player.animations.add('left', [2,3], 10, true);
	this.player.animations.add('right', [0,1], 10, true);

  //NPCs


    this.dez = game.add.sprite(game.world.width - 100, game.world.height - 200, 'desiree');
    game.physics.arcade.enable(this.dez);
    this.dez.body.gravity.y = 100;


  this.dialogueBox = game.add.sprite(game.world.width - 200, game.world.height - 300, 'dialogue');
  this.dialogueBox.visible = false;
  this.dialogueBox.scale.setTo(2.3,2);
  this.dezText = game.add.text(game.world.width - 190, game.world.height - 255, '', {font: 'bold 15px VT323', fill: '#000'});
  game.time.events.add(3000, this.writeDezText, this);



  //Obstacles
  this.obstacles = game.add.group();
    this.obstacles.enableBody = true;
  this.stick = this.obstacles.create(110, game.world.height - 400, 'stick');

  this.stick.body.immovable = true;

  //Enemies
  this.enemies = game.add.group();
  this.enemies.enableBody = true;
  this.cookie = this.enemies.create(1100, game.world.height - 190, 'cookie');
  this.cookie.body.gravity.y = 700;
  this.cookie.scale.setTo(1.5, 1.5);
  this.cookie.frame = 1;
  this.cookie.body.collideWorldBounds = true;
  this.cookie.body.velocity.x = -200;
  this.cookie.body.immovable = true;

  //Items
  this.doors = game.add.group();
  this.doors.enableBody = true;
  this.door = this.doors.create(1550, 40, 'door');

	this.treats = game.add.group();
	this.treats.enableBody = true;
  this.map.createFromObjects('objectLayer', 1958, 'treat', 0, true, false, this.treats);


	this.cursors = game.input.keyboard.createCursorKeys();

	this.weightText = game.add.text(16, 16, 'Weight: ' + this.weight + ' lbs', { font: '32px Bangers', fill: '#ffffff' });
	this.weightText.fixedToCamera = true;
	this.weightText.cameraOffset.setTo(16, 16);

	//audio

	this.meow = game.add.audio('meow');

 	game.time.events.loop(Phaser.Timer.SECOND * 2, this.updateCounter, this);

  game.time.events.loop(5000, this.changeFrame, this);

  game.time.events.loop(5000, this.changeDirection, this);

  game.time.events.repeat(Phaser.Timer.SECOND, 8, this.nextLetter, this);

  game.time.events.add(Phaser.Timer.SECOND * 10, this.byeText, this);


},

writeDezText: function() {
  this.dezText.text = this.dezText.text.concat('Hey baby dillinger do \nyou want some treats?');
},

nextLetter: function() {

    this.levelText.text = this.levelText.text.concat(this.line[this.letterIndex]);
    this.letterIndex++;

    if (this.letterIndex == 5) {
      this.levelText.text = this.levelText.text.concat("  ");
    }

},

byeText: function() {
  this.levelText.destroy();
},

changeDirection: function() {
  if (this.cookie.body.velocity.x < 0) {
    this.cookie.body.velocity.x = 150;
  } else if (this.cookie.body.velocity.x > 0) {
    this.cookie.body.velocity.x = -150;
  }
},

changeFrame: function() {
  if (this.cookie.frame == 0) {
    this.cookie.frame = 1;
  } else if (this.cookie.frame == 1) {
    this.cookie.frame = 0;
  }
},

updateCounter: function () {
if (this.weight > 0) {
  this.weight -= 1;
}
},

collectTreat: function (player, treat){
  treat.kill();
  this.meow.play('', 2);
  this.weight += 5;
},

nextLevel: function() {
  this.music.stop();
  game.state.start('level2');
},

conversation: function() {
  this.dialogueBox.visible = true;
  this.dezText.visible = true;
  if (!this.hasOverlapped) {
    this.weight += 20;
    this.meow.play('', 2);
  }
  this.hasOverlapped = true;
},

update: function () {

this.dialogueBox.visible = false;
this.dezText.visible = false;
this.stick.angle += 1;

	if (this.weight < 5 || this.weight == 5) {
		this.player.body.gravity.y = 50;
	} else {
		this.player.body.gravity.y = this.weight * 50;
	}

  //Enemy movement

  game.physics.arcade.collide(this.enemies, this.blockedLayer);
  var onEnemies = game.physics.arcade.collide(this.enemies, this.player, function(){this.player.body.velocity.x = -300}, null, this);
	game.physics.arcade.collide(this.treats, this.blockedLayer);
  game.physics.arcade.collide(this.stick, this.player);
  var hitPlatform = game.physics.arcade.collide(this.player, this.blockedLayer);
  game.physics.arcade.collide(this.treats, this.blockedLayer);
  var hitPlatformB = game.physics.arcade.collide(this.player, this.movingLayer);
  game.physics.arcade.collide(this.treats, this.movingLayer);
  game.physics.arcade.collide(this.dez, this.blockedLayer);

  game.physics.arcade.overlap(this.player, this.dez, this.conversation, null, this);
game.physics.arcade.overlap(this.player, this.treats, this.collectTreat, null, this);
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

//Enemy animations


//  Allow the player to jump if they are touching the ground.
if (this.player.body.blocked.down || onEnemies && this.weight > 0)
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
  this.music.stop();
  game.state.start('lose');
}
};
