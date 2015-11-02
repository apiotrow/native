var stage;
var walkspeed = 3;
var l, r, u, d, rel;
var walkDownFrames = {"starts": "0", "ends":"5"};
var changeFrames = false;
var player;

function Start() {


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
    player.newAnim("walkDown", "girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [0, 0, 0, 0, 0, 0],
        100);
    player.newAnim("idle", "girlsheet.png", 100, 100, 
        [0],
        [0],
        100);
    player.setupPlayerSprite(stage.stageWidth / 2, stage.stageHeight / 2);

    // function setupPlayerSprite(x, y){
    //     car = new Sprite();
    //     car.x = x;
    //     car.y = y;
    //     var tempBitmap;
    //     for(var i = 0; i < player.frames.length; i++){
    //         tempBitmap = new Bitmap(player.frames[i]);
    //         tempBitmap.x = -123;
    //         tempBitmap.y = -50;
    //         car.addChild(tempBitmap);
    //     }
    // }


    // stage.addChild(car);
    stage.addChild(player.sprite);


    setInterval(function(){ 
        changeFrames = true;
    }, 100);


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
    player.setCurrentAnim("idle");

    if (u) player.sprite.y -= walkspeed;
    if (d){
        player.sprite.y += walkspeed;
        player.setCurrentAnim("walkDown");
    }
    if (r) player.sprite.x += walkspeed;
    if (l) player.sprite.x -= walkspeed;
    if (rel) window.location.reload(false);

    //if we're allowed to change to the next frame, and the animation we've set
    //actually exists
    if(changeFrames && player.anims.hasOwnProperty(player.currentAnim)){

        //set all frames to invisible, except the one we're on
        for(var j = 0; j < player.sprite.numChildren; j++){
            player.sprite.getChildAt(j).visible = false;
            if(j == player.anims[player.currentAnim][2]){
                player.sprite.getChildAt(j).visible = true;
            }
        }

        //reset flag that lets us change frames
        changeFrames = false;

        //increment frame counter
        player.anims[player.currentAnim][2]++;

        //if frame counter is on last frame, reset it to the first one
        if(player.anims[player.currentAnim][2] >= player.anims[player.currentAnim][1]){
            player.anims[player.currentAnim][2] = player.anims[player.currentAnim][0];
        }
    }
}
