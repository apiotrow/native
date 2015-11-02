var stage, car;
var walkspeed = 3;
var l, r, u, d, rel, counter = 0;
var totalSeconds = 0;
var walkDownFrames = {"starts": "0", "ends":"5"};
var walkDownCounter = 0;
var changeFrames = false;


function setTime()
{
    ++totalSeconds;
}

function Start() {
    setInterval(setTime, 1000);

    stage = new Stage("c");
    stage.stageWidth = 700;
    stage.stageHeight = 400;

    // background
    var s = new Sprite();
    s.graphics.beginBitmapFill(new BitmapData("grasstile.png"));
    s.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
    stage.addChild(s);


    //char
    var player = new Person("player", {});
    player.newAnim("walkDown", "girlsheet.png", 100, 100, 
        [100, 200, 300, 400, 500, 600],
        [0, 0, 0, 0, 0, 0]);


    // car	
    car = new Sprite();
    car.x = stage.stageWidth / 2;
    car.y = stage.stageHeight / 2;
    var cb = new Bitmap();
    for(var i = 0; i < player.frames.length; i++){
        cb = new Bitmap(player.frames[i]);
        cb.x = -123;
        cb.y = -50;
        car.addChild(cb);
    }
    
    stage.addChild(car);

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

    if (u) car.y -= walkspeed;
    if (d) car.y += walkspeed;

    if (r) car.x += walkspeed;
    if (l) car.x -= walkspeed;
    if (rel) window.location.reload(false);


    if(changeFrames){
        for(var i = parseInt(walkDownFrames.starts); i <= parseInt(walkDownFrames.ends); i++){ 
            // console.log(parseInt(walkDownFrames.starts) + " " + parseInt(walkDownFrames.ends));
            if(i == walkDownCounter)  
                car.getChildAt(i).visible = true;
            else
                car.getChildAt(i).visible = false;
        }
        changeFrames = false;
        walkDownCounter++;
        if(walkDownCounter > parseInt(walkDownFrames.ends)){
            walkDownCounter = parseInt(walkDownFrames.starts);
        }
    }


    counter++;

    // console.log(totalSeconds + " " + counter);


}