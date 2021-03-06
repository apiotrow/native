define(['Person','ivank', "Input"], function(Person, ivank, Input) {
    var stage;
    var walkspeed = 3;
    var l = false, r = false, u = false, d = false, rel;
    var persons = [];


    setInterval(function(){ 
        rpgGlobs.time++;
    }, 100);


    stage = new Stage("c");
    stage.stageWidth = 700;
    stage.stageHeight = 400;


    //background
    var s = new Sprite();
    s.graphics.beginBitmapFill(new BitmapData("assets/textures/grasstile.png"));
    s.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
    stage.addChild(s);

    //player setup
    var player = new Person("player", stage, 100, 100, "assets/sprites/girlsheet.png", false);
    player.framesInfo = {
        "idleDown": {
            frameCoords: [
                [0,0]
            ],
            speed: 100
        },
        "idleRight": {
            frameCoords: [
                [0,200]
            ],
            speed: 100
        },
        "idleLeft": {
            frameCoords: [
                [0,300]
            ],
            speed: 100
        },
        "idleUp": {
            frameCoords: [
                [0,100]
            ],
            speed: 100
        },
        "walkDown": {
            frameCoords: [
                [100,0],
                [200,0],
                [300,0],
                [400,0],
                [500,0],
                [600,0],
            ],
            speed: 100
        },
        "walkRight": {
            frameCoords: [
                [100,200],
                [200,200],
                [300,200],
                [400,200],
                [500,200],
                [600,200],
            ],
            speed: 100
        },
        "walkLeft": {
            frameCoords: [
                [100,300],
                [200,300],
                [300,300],
                [400,300],
                [500,300],
                [600,300],
            ],
            speed: 100
        },
        "walkUp": {
            frameCoords: [
                [100,100],
                [200,100],
                [300,100],
                [400,100],
                [500,100],
                [600,100],
            ],
            speed: 100
        },
    };
    player.createAnims();
    player.setupSprite(stage.stageWidth / 2, stage.stageHeight / 2);
    persons.push(player);

    var npc = new Person("npcguy", stage, 100, 100, "assets/sprites/girlsheet.png", true);
    npc.framesInfo = {
        "walkDown": {
            frameCoords: [
                [100,0],
                [200,0],
                [300,0],
                [400,0],
                [500,0],
                [600,0],
            ],
            speed: 100
        },
    }
    npc.createAnims();
    npc.setupSprite(stage.stageWidth / 3, stage.stageHeight / 3);
    npc.setCurrentAnim("walkDown");
    persons.push(npc);

    var npc2 = new Person("npcguy2", stage, 100, 100, "assets/sprites/girlsheet.png", true);
    npc2.framesInfo = {
        "walkUp": {
            frameCoords: [
                [100,100],
                [200,100],
                [300,100],
                [400,100],
                [500,100],
                [600,100],
            ],
            speed: 100
        },
    }
    npc2.createAnims();
    npc2.setupSprite(stage.stageWidth / 4 + 350, stage.stageHeight / 4 + 100);
    npc2.setCurrentAnim("walkUp");
    // persons.push(npc2);


    //initialize input handler
    var newInput = new Input(player);


    //add all persons to stage
    for(var i = 0; i < persons.length; i++){
        stage.addChild(persons[i].sprite);
    }


    //key input events
    stage.addEventListener(KeyboardEvent.KEY_DOWN, function(e){
        if (e.keyCode == 37) l = true;
        if (e.keyCode == 38) u = true;
        if (e.keyCode == 39) r = true;
        if (e.keyCode == 40) d = true;

        if (e.keyCode == 65) l = true; //a
        if (e.keyCode == 87) u = true; //w
        if (e.keyCode == 68) r = true; //d
        if (e.keyCode == 83) d = true; //s

        if (e.keyCode == 82) rel = true; //r
    });
    stage.addEventListener(KeyboardEvent.KEY_UP, function(e) {
        if (e.keyCode == 37) l = false;
        if (e.keyCode == 38) u = false;
        if (e.keyCode == 39) r = false;
        if (e.keyCode == 40) d = false;
        
        if (e.keyCode == 65) l = false; //a
        if (e.keyCode == 87) u = false; //w
        if (e.keyCode == 68) r = false; //d
        if (e.keyCode == 83) d = false; //s

        if (e.keyCode == 82) rel = false; //r
    });


    stage.addEventListener(Event.ENTER_FRAME, EF);
    

    function EF(){
        // //update all Persons
        for(var i = 0; i < persons.length; i++){
            persons[i].update(persons);
        }

        //send newest inputs into input handler, and send all other persons
        newInput.update(u, d, l, r, rel);
    }
});
