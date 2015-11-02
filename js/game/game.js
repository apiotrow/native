define('game', ['Person','ivank', 'input'], function(perss, ivank, input) {
    function Start() {
        var stage;
        var walkspeed = 3;
        var l = false, r = false, u = false, d = false, rel;
        var player;
        var persons = [];
        // var time = 0;

        setInterval(function(){ 
            time++;
        }, 100);

        stage = new Stage("c");
        stage.stageWidth = 700;
        stage.stageHeight = 400;
        console.log("Sdf");

        //background
        var s = new Sprite();
        s.graphics.beginBitmapFill(new BitmapData("assets/textures/grasstile.png"));
        s.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
        stage.addChild(s);

        console.log((typeof(perss)));
        //player setup

        player = new perss("player");
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
        stage.addEventListener(KeyboardEvent.KEY_DOWN, onKD);
        // stage.addEventListener(KeyboardEvent.KEY_UP, input.onKU);
        // stage.addEventListener(Event.ENTER_FRAME, onEF);

        var onKD = function(e) {
            // console.log(e.keyCode);
            if (e.keyCode == 37) l = true;
            if (e.keyCode == 38) u = true;
            if (e.keyCode == 39) r = true;
            if (e.keyCode == 40) d = true;

            if (e.keyCode == 65) l = true; //a
            if (e.keyCode == 87) u = true; //w
            if (e.keyCode == 68) r = true; //d
            if (e.keyCode == 83) d = true; //s

            if (e.keyCode == 82) rel = true; //r
        };

        var onEF = function(e) {
            input.playerMovement();

            //update all Persons
            for(var i = 0; i < persons.length; i++){
                persons[i].update();
            }
        };
    }
    return {
        Start: Start
    }
});
