class MenuScene extends Phaser.Scene{
    constructor(){
        super("MenuScene");
    }

    // init(data){
    //     console.log(data);
    //     console.log("i got it!")
    // }

    create(){
        this.add.image(0,0, "title_bg").setOrigin(0,0).setDepth(0);

        let playButton = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5, "play_button");
        playButton.setInteractive();
        playButton.on("pointerdown", ()=>{
            this.scene.start("PlayScene");
        });

    }
}