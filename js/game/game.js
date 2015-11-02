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
    player.setupSprite(stage.stageWidth / 2, stage.stageHeight / 2);
    persons.push(player);


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
    stage.addEventListener(Event.ENTER_FRAME, playerMovement);
    
    var keyOne = "";
    var doubleMove = false;
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

        function onlyUp(){
            if(u && !d && !r && !l){
                return true;
            }
        }
        function onlyDown(){
            if(!u && d && !r && !l){
                return true;
            }
        }
        function onlyLeft(){
            if(!u && !d && !r && l){
                return true;
            }
        }
        function onlyRight(){
            if(!u && !d && r && !l){
                return true;
            }
        }

        if(onlyUp()){
            keyOne = "u";
        }else if(onlyDown()){
            keyOne = "d";
        }else if(onlyLeft()){
            keyOne = "l";
        }else if(onlyRight()){
            keyOne = "r";
        }



        console.log(keyOne);
        if(r){
            if (keyOne == "u"){
                player.moveRight("walkUp");
            }else if(keyOne == "d"){
                player.moveRight("walkDown");
            }else if(keyOne == "r"){
                player.moveRight("walkRight");
            }else if(keyOne == "l"){
                player.setCurrentAnim("idleDown");
            }
        }
        if (l){
            if (keyOne == "u"){
                player.moveLeft("walkUp");
            }else if(keyOne == "d"){
                player.moveLeft("walkDown");
            }else if(keyOne == "r"){
                player.setCurrentAnim("idleDown");
            }else if(keyOne == "l"){
                player.moveLeft("walkLeft");
            }
        }
        if (u){
            if (keyOne == "u"){
                player.moveUp("walkUp");
            }else if(keyOne == "d"){
                player.setCurrentAnim("idleDown");
            }else if(keyOne == "r"){
                player.moveUp("walkRight");
            }else if(keyOne == "l"){
                player.moveUp("walkLeft");
            }
        }
        if (d){
            if (keyOne == "u"){
                player.setCurrentAnim("idleDown");
            }else if(keyOne == "d"){
                player.moveDown("walkDown");
            }else if(keyOne == "r"){
                player.moveDown("walkRight");
            }else if(keyOne == "l"){
                player.moveDown("walkLeft");
            }
        }
        
        if (rel) window.location.reload(false);

        //update all Persons
        for(var i = 0; i < persons.length; i++){
            persons[i].update();
        }
    }


    
});
