var menuState = {


  create: function() {

    var nameLabel = game.add.text(300, 265, 'Dillingers Journey', {font: '100px VT323', fill: '#ffa500'});
    var startLabel = game.add.text(320, 400, 'Press enter to start', {font: '30px Monoton', fill: '#ffffff'});
    this.menuMusic = game.add.audio('menuMusic');
    this.menuMusic.loop = true;
    this.menuMusic.play();

    var enterkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    enterkey.onDown.addOnce(this.start, this);
  },

  start: function () {
    this.menuMusic.stop();
    game.state.start('play');
  }


};
