var loadState = {
  preload: function () {
     var loadingLabel = game.add.text(80, 150, 'loading...');
     game.load.tilemap('tiledMap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
     game.load.tilemap('secondLevel', 'assets/secondLevel.json', null, Phaser.Tilemap.TILED_JSON);
     game.load.image('tileset', 'assets/tiles.png');
     game.load.image('sky', 'assets/sky.png');
     game.load.image('ground', 'assets/platform.png');
     game.load.image('treat', 'assets/treat.png');
     game.load.image('door', 'assets/door.png');
     game.load.spritesheet('sprite', 'assets/cat.png', 64, 45);
     game.load.audio('meow', 'assets/meow.ogg');
     game.load.audio('menuMusic', 'assets/menuSong.wav');
     game.load.audio('gameMusic', 'assets/game.wav');
  },
  create: function () {

    game.state.start('menu');
  }
};
