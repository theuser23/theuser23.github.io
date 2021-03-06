var winState = {

    create: function() {

	var winLabel = game.add.text(320, game.world.height / 2 - 100, 'YOU WIN!',
								{font: '100px Monoton', fill: '#00FF00'});

		// We give the player instructions on how to restart the game
	var startLabel = game.add.text(400, 400,
								   'Press enter to restart',
								   {font: '25px Arial', fill: '#ffffff' });

        // We define the wkey as Phaser.Keyboard.W so that we can act
        // when the player presses it
        var enterkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // When the player presses the W key, we call the restart function
        enterkey.onDown.addOnce(this.restart, this);
    },

    // The restart function calls the menu state
    restart: function () {
        game.state.start('menu');
    },
}
