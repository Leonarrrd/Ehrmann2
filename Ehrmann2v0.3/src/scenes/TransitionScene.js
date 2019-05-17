class TransitionScene extends Phaser.Scene{
    constructor(){
        super("TransitionScene");
    }



    create(){
        initTransition(this);
        this.cameras.main.flash(3000,255,255,255);


        gameState.nextLevel = initLevel2
        var scene = this;
        setTimeout(function(){
            scene.scene.start('PlayScene');
        }, 4000);
    }

    update(){
    }
}