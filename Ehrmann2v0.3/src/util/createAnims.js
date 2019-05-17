function createAnims(scene){
    //ehrmann left
    scene.anims.create({
        key: 'left1',
        frames: scene.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    
    //ehrmann right
    scene.anims.create({
        key: 'right1',
        frames: scene.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    //ehrmann turn
    scene.anims.create({
        key: 'turn1',
        frames: [{
            key: 'dude',
            frame: 4
                }],
        frameRate: 20
    });

    //ehrmann jump
    scene.anims.create({
        key: 'jump1',
        frames: [{
            key: 'dude',
            frame: 6
                }],
        frameRate: 20
    });

    //schweinehund left
    scene.anims.create({
        key: 'left2',
        frames: scene.anims.generateFrameNumbers('dude2', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    
    //schweinehund right
    scene.anims.create({
        key: 'right2',
        frames: scene.anims.generateFrameNumbers('dude2', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    //schweinehund turn
    scene.anims.create({
        key: 'turn2',
        frames: [{
            key: 'dude2',
            frame: 4
                }],
        frameRate: 20
    });

    //schweinehund jump
    scene.anims.create({
        key: 'jump2',
        frames: [{
            key: 'dude2',
            frame: 6
                }],
        frameRate: 20
    });    
}