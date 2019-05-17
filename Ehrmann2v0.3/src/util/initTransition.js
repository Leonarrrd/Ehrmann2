function initTransition(scene){
    //background
    scene.bg = scene.add.image(0,0,'transition_bg').setOrigin(0);

    scene.ehrmann = scene.physics.add.sprite(375, 400, 'dude').anims.play('right1', true);
    scene.schweinehund = scene.physics.add.sprite(425, 400, 'dude2').anims.play('right2', true);
    scene.players = [scene.ehrmann, scene.schweinehund];

    scene.map = scene.make.tilemap({
        key: 'transition'
    });
    let map = scene.map; // so i wont have to write 'scene.' a million times
    
    var fruitTiles = map.addTilesetImage('fruitTileSet', 'fruitTileSetImage');

    map.solidLayer = map.createStaticLayer('SolidLayer', fruitTiles, 0, 0);
    // solid tiles
    map.solidLayer.setCollisionByExclusion([-1]);
    scene.physics.add.collider(map.solidLayer, scene.players);


    // scene.cameras.main.startFollow(scene.ehrmann, true, 1, 1)
    scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);

    scene.update = function(){
        this.bg.x -= 5;
    }
}