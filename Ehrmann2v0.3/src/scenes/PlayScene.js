class PlayScene extends Phaser.Scene{
    constructor(){
        super("PlayScene");
    }



    create(){
        // gamestate.nextLevel is the method, e.g. initLevel1(scene)
        gameState.nextLevel(this);
        // this.cameras.main.flash(1500,255,255,255);

        this.switchPhase("onTheRun")
    }

    update(){
    }
}