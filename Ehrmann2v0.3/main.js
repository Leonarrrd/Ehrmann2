var gameState = {
    nextLevel : initLevel1
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  //   width: 800,
  //   height: 480
  // },
  zoom: 0.8,
  physics: {
    default: "arcade",
    arcade: {
      tileBias: 32,
      gravity: { y: 500 },
      debug: true
    }
  },
  scene: [
    LoadScene,
    MenuScene,
    PlayScene,
    TransitionScene
  ]
};

const game = new Phaser.Game(config);
//useful code to debug
/*const debugGraphics = this.add.graphics().setAlpha(0.75);
belowLayer.renderDebug(debugGraphics, {
  tileColor: null, // Color of non-colliding tiles
  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
});*/