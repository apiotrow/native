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



    //char anim
    var frames = [];
    function addFrame(spritesheet, x, y, w, h){
        var newHund = new BitmapData("onehundy.png");
        var ss = new BitmapData(spritesheet);
        ss.loader.addEventListener(Event.COMPLETE, function (e) {
            var pixeldata = ss.getPixels(new Rectangle(x,y,w,h));
            newHund.setPixels(new Rectangle(0,0,100,100), pixeldata);
        });
        frames.push(newHund);
    }

    addFrame("girlsheet.png", 100, 0, 100, 100);
    addFrame("girlsheet.png", 200, 0, 100, 100);
    addFrame("girlsheet.png", 300, 0, 100, 100);
    addFrame("girlsheet.png", 400, 0, 100, 100);
    addFrame("girlsheet.png", 500, 0, 100, 100);
    addFrame("girlsheet.png", 600, 0, 100, 100);
    walkDownFrames['start'] = 0;
    walkDownFrames['end'] = 5;


    // car	
    car = new Sprite();
    car.x = stage.stageWidth / 2;
    car.y = stage.stageHeight / 2;
    var cb = new Bitmap();
    for(var i = 0; i < frames.length; i++){
        cb = new Bitmap(frames[i]);
        cb.x = -123;
        cb.y = -50;
        car.addChild(cb);
    }
    
    
    // var cb = new Bitmap(frames[0]);
    // cb.x = -123;
    // cb.y = -50;
    // cb.id = "frame1";
    // car.addChild(cb);
    // cb = new Bitmap(frames[1]);
    // cb.x = -123;
    // cb.y = -50;
    // cb.id = "frame2";
    // car.addChild(cb);
    // console.log(car.getChildAt(0));
    // console.log(car.getChildAt(1));

    stage.addChild(car);

    setInterval(function(){ 
        changeFrames = true;
    }, 1000);

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
    // if(totalSeconds%2 == 0){
    //     car.getChildAt(0).visible = false;
    //     car.getChildAt(1).visible = true;
    // }else{
    //     car.getChildAt(1).visible = false;
    //     car.getChildAt(0).visible = true;
    // }

    counter++;

    // console.log(totalSeconds + " " + counter);


}