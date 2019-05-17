class LoadScene extends Phaser.Scene{
    constructor() {
        super("LoadScene");
    }

    preload(){
        // menu

        this.load.image("title_bg", "./assets/images/title_bg.jpg");
        this.load.image("play_button", "./assets/images/play_button.png");



        //   images
        this.load.image('eggplant','./assets/images/eggplant32x32.png');
        this.load.image('transition_bg','./assets/images/transitionBG.png');
        

        // load tileset as png
        this.load.image('fruitTileSetImage', './assets/images/fruitTileSet.png');
        // load map.json exported from Tiled
        this.load.tilemapTiledJSON('level', './assets/maps/level1.json');
        this.load.tilemapTiledJSON('transition', './assets/maps/transition.json');
        // spritesheet
        this.load.spritesheet('dude', './assets/spritesheets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dude2', './assets/spritesheets/dude2.png', {
            frameWidth: 32,
            frameHeight: 48
        });

        // progress
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: 'Normen schubst kleine Kinder vom Fahrrad und riecht am Sattel.\n\n\n                         Da bin ich mir',
            // jokus
            // text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('sicher');
            // jokus
            // assetText.setText('Loading asset: ' + file.key);
        });
 
    }

    create(){
        createAnims(this);
        this.scene.start("PlayScene");

        // this.scene.start(CST.SCENES.MENU, "hello from load scene");
        // this.scene.start(CST.SCENES.PLAY);
    }
}