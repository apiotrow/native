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


    //add all persons to stage
    for(var i = 0; i < persons.length; i++){
        stage.addChild(persons[i].sprite);
    }


    // events
    stage.addEventListener(KeyboardEvent.KEY_DOWN, onKD);
    stage.addEventListener(KeyboardEvent.KEY_UP, onKU);
    stage.addEventListener(Event.ENTER_FRAME, onEF);
}



function onEF(e) {
    playerMovement();

    //update all Persons
    for(var i = 0; i < persons.length; i++){
        persons[i].update();
    }

}
