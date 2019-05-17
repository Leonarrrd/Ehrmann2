function initLevel2(scene){
    scene.physicsProperties = {
        gravity: 1200,
        onTheRunVelocity: 300,
        minJumpPower: -200,
        maxJumpPower: -400
    }

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

    scene.cameras.main.setBackgroundColor('rgba(255,99,165)');
    // make camera stay in map // refactored to createLevel1
    // scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);

    scene.physics.world.bounds.width = 1000 * 32; // map is not loaded yet, either put in bounds manually or just fuck it
    scene.physics.world.bounds.height = 32 * 15; // same as above

    scene.physics.world.gravity.y = scene.physicsProperties.gravity;

    
    

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
        if (this.map.roomWallCollider){
            this.map.roomWallCollider.destroy();
            this.map.roomWallLayer.setVisible(false);
        }
        console.log("onTheRun initiated!");
    }

    scene.initPlatformer = function() {
        // that first does things that all rooms have (activate walls etc.)
        // and then calls the room specific function
        this.map.roomWallCollider = this.physics.add.collider(this.map.roomWallLayer, this.players);
        this.map.roomWallLayer.setVisible(true);
        
    //    this is bullshit
        var scene = this;
        setTimeout(function(){
            scene.switchPhase("onTheRun");
        }, 5000);
        console.log("Platformer Initiated!");
    }

    // stops the camerapoint and destroys the stopzone
    // so that the camerapoint can continue later
    scene.stopPoint = function(point, cameraStop) {
        cameraStop.destroy();
        this.point.body.velocity.x = 0;
        console.log("Camerapoint stopped!")
    }

    // i dont know why, but function parameters are passed in the wrong order
    scene.platformerZoneOverlap = function(player, initZone){
        initZone.destroy();
        this.switchPhase("platformer");
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
            this.scene.start("TransitionScene");
        }
    }

    console.log(scene.map.heightInPixels);
    console.log("init done!")
}