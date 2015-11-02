define(['Person','ivank'], function(Person, ivank) {
    var stage;
    var walkspeed = 3;
    var l = false, r = false, u = false, d = false, rel;
    var player;
    var persons = [];


    setInterval(function(){ 
        time++;
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
    player = new Person("player");
    player.newAnim("idleDown", "assets/sprites/girlsheet.png", 100, 100, 
        [0],
        [0],
        100);
    player.newAnim("idleRight", "assets/sprites/girlsheet.png", 100, 100, 
        [0],
        [200],
        100);
    player.newAnim("idleLeft", "assets/sprites/girlsheet.png", 100, 100, 
        [0],
        [300],
        100);
    player.newAnim("idleUp", "assets/sprites/girlsheet.png", 100, 100, 
        [0],
        [100],
        100);
    player.newAnim("walkDown", "assets/sprites/girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [0, 0, 0, 0, 0, 0],
        100);
    player.newAnim("walkRight", "assets/sprites/girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [200, 200, 200, 200, 200, 200],
        100);
    player.newAnim("walkLeft", "assets/sprites/girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [300, 300, 300, 300, 300, 300],
        100);
    player.newAnim("walkUp", "assets/sprites/girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [100, 100, 100, 100, 100, 100],
        100);
    player.setupPlayerSprite(stage.stageWidth / 2, stage.stageHeight / 2);
    persons.push(player);


    //add all persons to stage
    for(var i = 0; i < persons.length; i++){
        stage.addChild(persons[i].sprite);
    }


    // events
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
    stage.addEventListener(Event.ENTER_FRAME, playerMovement);
    

    function playerMovement(e) {
        //animation when no movement input is being given
        if(player.currentAnim == "walkRight")
            player.setCurrentAnim("idleRight");
        else if(player.currentAnim == "walkDown")
            player.setCurrentAnim("idleDown");
        else if(player.currentAnim == "walkUp")
            player.setCurrentAnim("idleUp");
        else if(player.currentAnim == "walkLeft")
            player.setCurrentAnim("idleLeft");

        // if(onlyUp()){
            
        // }

        if (u){
            player.moveUp();
        }
        if (d){
            player.moveDown();
        }
        if (r){
            player.moveRight();
        }
        if (l){
            player.moveLeft();
        }
        if (rel) window.location.reload(false);

        //update all Persons
        for(var i = 0; i < persons.length; i++){
            persons[i].update();
        }
    }
    
});
