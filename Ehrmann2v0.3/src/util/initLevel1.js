function initLevel1(scene){
    scene.physicsProperties = {
        gravity: 1200,
        onTheRunVelocity: 300,
        minJumpPower: -200,
        maxJumpPower: -400
    }

    scene.physics.world.gravity.y = scene.physicsProperties.gravity;


    scene.gameState = {
        phase : "platformer"
    }


    scene.keys = scene.input.keyboard.addKeys('up,down,left,right,w,a,s,d,space');  // keys.W, keys.S, keys.A, keys.D

    scene.ehrmann = scene.physics.add.sprite(375, 400, 'dude');
    configPlayer(scene.ehrmann, 1, scene.keys.left, scene.keys.right, scene.keys.up, scene.keys.down);

    scene.schweinehund = scene.physics.add.sprite(425, 400, 'dude2');
    configPlayer(scene.schweinehund, 2, scene.keys.a, scene.keys.d, scene.keys.w, scene.keys.s);

    scene.players = [scene.schweinehund, scene.ehrmann];

    scene.scoreText = scene.add.text(100, 100, 'Ehrmann: ' + scene.ehrmann.points + '\n' + "Schweinehund: " + scene.schweinehund.points, { fontSize: '32px', fill: '#555555'});
    scene.scoreText.setScrollFactor(0);

    // point that will serve as the camera reference point
    scene.point = scene.physics.add.sprite(400, 0, 'dude');
    scene.point.body.setAllowGravity(false);
    scene.point.setCollideWorldBounds(true);
    scene.cameras.main.startFollow(scene.point, true, 1.0, 1.0);

    scene.cameras.main.setBackgroundColor('rgba(180, 234, 234)');
    // make camera stay in map // refactored to createLevel1
    // scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);

    scene.physics.world.bounds.width = 1000 * 32; // map is not loaded yet, either put in bounds manually or just fuck it
    scene.physics.world.bounds.height = 32 * 15; // same as above


    scene.switchPhase = function(phase) {
        this.gameState.phase = phase;
        switch (phase) {
            case "platformer":
                this.initPlatformer();
                break;
            case "onTheRun":
                this.initOnTheRun();
                break;
        }
    }

    // initiates a running phase by making he camerapoint move
    // and by destroying the roomwalls
    scene.initOnTheRun = function() {
        this.point.body.velocity.x = this.physicsProperties.onTheRunVelocity;
        if (this.map.airlockBCollider){
            this.map.airlockBCollider.destroy();
            this.map.airlockBLayer.setVisible(false);

            this.map.airlockACollider = this.physics.add.collider(this.map.airlockALayer, this.players);
            this.map.airlockALayer.setVisible(true);
        }
        console.log("onTheRun initiated!");
    }

    scene.initPlatformer = function() {
        // that first does things that all rooms have (activate walls etc.)
        // and then calls the room specific function
        this.map.airlockACollider.destroy();
        this.map.airlockALayer.setVisible(false);

        this.map.airlockBCollider = this.physics.add.collider(this.map.airlockBLayer, this.players);
        this.map.airlockBLayer.setVisible(true);
        
        setCountDown(this);

        // this is bullshit
        var scene = this;
        setTimeout(function(){
            scene.switchPhase("onTheRun");
        }, 5000);
        console.log("Platformer Initiated!");
    }

    scene.resetPlayer = function (player) {
        player.body.x = scene.point.body.x;
        player.body.y = 50;
        player.points--;
        this.scoreText.setText('Ehrmann: ' + this.ehrmann.points + '\n' + "Schweinehund: " + this.schweinehund.points);
    }

    // stops the camerapoint and destroys the stopzone
    // so that the camerapoint can continue later
    scene.stopPoint = function(point, cameraStop) {
        cameraStop.destroy();
        this.point.body.velocity.x = 0;
        this.switchPhase("platformer");
        console.log("Camerapoint stopped!")
    }

    // collects an eggplant on collision and removes it
    scene.collectEggplant = function(player, eggplant){
        player.points++;
        eggplant.destroy();
        this.scoreText.setText('Ehrmann: ' + this.ehrmann.points + '\n' + "Schweinehund: " + this.schweinehund.points);
    }

    scene.finishLevel = function(){
        this.scene.start("TransitionScene");
    }

    createLevel1(scene);

    scene.update = function () {
        this.players.forEach(player => {
            player.update(this);
        });

        if (this.keys.space.isDown){
            // this.scene.start("TransitionScene");
            this.point.body.x = 3500;
        }
    }

    console.log(scene.map.heightInPixels);
    console.log("init done!")
}


function configPlayer(player, id, left, right, up, down) {
    // set variables and input keys
    player.id = id;
    player.right = right;
    player.left = left;
    player.up = up;
    player.down = down

    player.jumping = true;
    player.anim = 'turn';

    player.points = 0;

    player.setCollideWorldBounds(true);


    /*
    * function runs every frame
    * determines input, physics, etc. depending on which phase the game is in
    */
    player.update = function(scene){
        this.anims.play(this.anim + this.id, true);

        switch(scene.gameState.phase){
            case "platformer":
                if(this.right.isDown){
                    this.body.velocity.x = 200;
                    this.anim = 'right';
                } else if (this.left.isDown) {
                    this.body.velocity.x = -200;
                    this.anim = 'left';
                } else {
                    this.body.velocity.x = 0;
                    this.anim = 'turn';
                }
                if (this.up.isDown){
                    if (this.body.onFloor()){
                        this.body.velocity.y = scene.physicsProperties.minJumpPower;
                        this.jumping = true;
                    } else if (this.jumping && this.body.velocity.y > scene.physicsProperties.maxJumpPower + 85) {
                        this.body.velocity.y += (scene.physicsProperties.maxJumpPower - this.body.velocity.y) * 0.25;
                        console.log(this.body.velocity.y)
                    } else {
                        this.jumping = false;
                    }
                } else {
                    this.jumping = false;
                }
                
                // for testing purposes only
                if (this.down.isDown) {
                    this.body.velocity.y = -350;
                }
                break;
            case "onTheRun":
                //anim
                if (this.body.onFloor()){
                    this.anim = 'right';
                } else {
                    this.anim = 'jump';
                }

                this.body.velocity.x = scene.physicsProperties.onTheRunVelocity;
                
                // if (this.body.onFloor()) this.jumping = true;
                
                // apply rubberband effect if player falls behind
                if (this.x < scene.point.x - 75 + 50 * this.id) {
                    this.body.velocity.x += (scene.point.x - 75 + 50 * this.id - this.x) * 0.2;
                }
                
                // reset player if he's off screen
                if (this.body.x + this.body.width + scene.cameras.main.width/2 < scene.point.x ){
                    this.x = scene.point.x - 100;
                    this.y = 100;
                }
                
                //inputs, might want to put this befor switch statement so it applies to "platformer" phase aswell
                if (this.up.isDown){
                    if (this.body.onFloor()){
                        this.body.velocity.y = scene.physicsProperties.minJumpPower;
                        this.jumping = true;
                    } else if (this.jumping && this.body.velocity.y > scene.physicsProperties.maxJumpPower + 85) {
                        this.body.velocity.y += (scene.physicsProperties.maxJumpPower - this.body.velocity.y) * 0.25;
                        console.log(this.body.velocity.y)
                    } else {
                        this.jumping = false;
                    }
                } else {
                    this.jumping = false;
                }
                
                // for testing purposed only
                if (this.down.isDown){
                    this.body.velocity.y = -300;
                }
                break;
        }
    }
}

function createLevel1(scene) {
    scene.map = scene.make.tilemap({
        key: 'level'
    });
    let map = scene.map; // so i wont have to write 'scene.' a million times
    
    var fruitTiles = map.addTilesetImage('fruitTileSet', 'fruitTileSetImage');

    map.solidLayer = map.createStaticLayer('SolidLayer', fruitTiles, 0, 0);
    map.airlockALayer = map.createDynamicLayer('Airlock-A', fruitTiles, 0,0);
    map.airlockBLayer = map.createDynamicLayer('Airlock-B', fruitTiles, 0,0);
    map.deathLayer = map.createStaticLayer('Lava', fruitTiles, 0,0);
    map.cameraStopLayer = map.getObjectLayer('CameraStop')['objects'];
    map.eggplantLayer = map.getObjectLayer('Eggplants')['objects'];
    map.finishLayer = map.getObjectLayer('Finish')['objects'];

    // solid tiles
    map.solidLayer.setCollisionByExclusion([-1]);
    scene.physics.add.collider(map.solidLayer, scene.players);
    
    // airlockA
    map.airlockALayer.setCollisionByExclusion([-1]);
    map.airlockACollider = scene.physics.add.collider(map.airlockALayer, scene.players);

    // map.airlockALayer.setVisible(false);

    // airlockB
    map.airlockBLayer.setCollisionByExclusion([-1]);
    map.airlockBLayer.setVisible(false);
    
    //lava
    map.deathLayer.setCollisionByExclusion([-1]);
    scene.physics.add.collider(map.deathLayer, scene.players, scene.resetPlayer, null, scene);
    
    // camera-stop zones
    var cameraStops = scene.physics.add.group({ classType: Phaser.GameObjects.Zone });
    map.cameraStopLayer.forEach(function(zone){
        let cameraStop = cameraStops.create(zone.x, zone.y, zone.width, zone.height);
        cameraStop.setOrigin(0,0);
        cameraStop.body.setAllowGravity(false);
    });
    scene.physics.add.overlap(cameraStops, scene.point, scene.stopPoint, null, scene);
    
    //eggplants
    var eggplants = scene.physics.add.staticGroup();
    //this is how we actually render our coin object with coin asset we loaded into our game in the preload function
    map.eggplantLayer.forEach(object => {
        // for some reason, there's some offset when importing the objectLayer, therefore -width*0.5 etc.
        let obj = eggplants.create(object.x + object.width * 0.5, object.y - object.height * 0.5, "eggplant"); 
    });
    scene.physics.add.overlap(eggplants, scene.players, scene.collectEggplant, null, scene);

    // finish
    var finish = scene.physics.add.group({ classType: Phaser.GameObjects.Zone });
    map.finishLayer.forEach(function(zone){
        let obj = finish.create(zone.x, zone.y, zone.width, zone.height);
        obj.body.setAllowGravity(false);
        obj.setOrigin(0,0);
    });
    scene.physics.add.overlap(finish, scene.players, scene.finishLevel, null, scene);

    // make camera stay in map
    scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    console.log(scene.ehrmann.height);
}