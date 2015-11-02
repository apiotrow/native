var stage;
var walkspeed = 3;
var l = false, r = false, u = false, d = false, rel;
var walkDownFrames = {"starts": "0", "ends":"5"};
var player;
var persons = [];
var time = 0;

function Start() {
    setInterval(function(){ 
        time++;
    }, 100);

    stage = new Stage("c");
    stage.stageWidth = 700;
    stage.stageHeight = 400;

    //background
    var s = new Sprite();
    s.graphics.beginBitmapFill(new BitmapData("grasstile.png"));
    s.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
    stage.addChild(s);


    //player setup
    player = new Person("player");
    player.newAnim("idleDown", "girlsheet.png", 100, 100, 
        [0],
        [0],
        100);
    player.newAnim("idleRight", "girlsheet.png", 100, 100, 
        [0],
        [200],
        100);
    player.newAnim("idleLeft", "girlsheet.png", 100, 100, 
        [0],
        [300],
        100);
    player.newAnim("idleUp", "girlsheet.png", 100, 100, 
        [0],
        [100],
        100);
    player.newAnim("walkDown", "girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [0, 0, 0, 0, 0, 0],
        100);
    player.newAnim("walkRight", "girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [200, 200, 200, 200, 200, 200],
        100);
    player.newAnim("walkLeft", "girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [300, 300, 300, 300, 300, 300],
        100);
    player.newAnim("walkUp", "girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [100, 100, 100, 100, 100, 100],
        100);
    player.setupPlayerSprite(stage.stageWidth / 2, stage.stageHeight / 2);
    persons.push(player);


    for(var i = 0; i < persons.length; i++){
        stage.addChild(persons[i].sprite);
    }


    // events
    stage.addEventListener(KeyboardEvent.KEY_DOWN, onKD);
    stage.addEventListener(KeyboardEvent.KEY_UP, onKU);
    stage.addEventListener(Event.ENTER_FRAME, onEF);
}

function onKD(e) {
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
}

function onKU(e) {
    if (e.keyCode == 37) l = false;
    if (e.keyCode == 38) u = false;
    if (e.keyCode == 39) r = false;
    if (e.keyCode == 40) d = false;
    
    if (e.keyCode == 65) l = false; //a
    if (e.keyCode == 87) u = false; //w
    if (e.keyCode == 68) r = false; //d
    if (e.keyCode == 83) d = false; //s

    if (e.keyCode == 82) rel = false; //r
}

function onEF(e) {
    //animation when no movement input is being given
    if(player.currentAnim == "walkRight")
        player.setCurrentAnim("idleRight");
    else if(player.currentAnim == "walkDown")
        player.setCurrentAnim("idleDown");
    else if(player.currentAnim == "walkUp")
        player.setCurrentAnim("idleUp");
    else if(player.currentAnim == "walkLeft")
        player.setCurrentAnim("idleLeft");

    // console.log(u + " " + d + " " + r + " " + l);
    if (u){
        player.sprite.y -= walkspeed;
        player.setCurrentAnim("walkUp");
    }
    if (d){
        player.sprite.y += walkspeed;
        player.setCurrentAnim("walkDown");
    }
    if (r){
        player.sprite.x += walkspeed;
        player.setCurrentAnim("walkRight");
    }
    if (l){
        player.sprite.x -= walkspeed;
        player.setCurrentAnim("walkLeft");
    }
    if (rel) window.location.reload(false);

    //update all Persons
    for(var i = 0; i < persons.length; i++){
        persons[i].update();
    }

}
