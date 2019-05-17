function createAnims(scene){
    //ehrmann left
    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    //ehrmann turn
    scene.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 4
                }],
        frameRate: 20
    });

    //ehrmann right
    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });
}

function test(){
    console.log("test successful")
}

function setCountDown(scene){
    scene.countDownNum = 5;
    scene.countDownText = scene.add.text(scene.cameras.main.width/2,scene.cameras.main.height/2 - 100, scene.countDownNum, { fontSize: '100px', fill: '#555555'});
    scene.countDownText.setScrollFactor(0);
    for (let i = 1; i < 6; i++){
        setTimeout(function(){
            if (i != 5){
                scene.countDownNum--;
                scene.countDownText.setText(scene.countDownNum);
            } else {
                scene.countDownText.destroy();
                console.log("you")
            }
        }, i * 1000);
    }
}