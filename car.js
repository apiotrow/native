        var stage, car;
        var walkspeed = 3;
        var l, r, u, d, rel, counter = 0;
        var totalSeconds = 0;
        

        var frames = [];

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
            var onehundy = new BitmapData("onehundy.png");
            var girl = new BitmapData("girlsheet.png");
            girl.loader.addEventListener(Event.COMPLETE, goOn);
            function goOn(e) {
                var mydata = girl.getPixels(new Rectangle(100,0,100,100));
                onehundy.setPixels(new Rectangle(0,0,100,100), mydata);
                // dragonBD.loader.addEventListener(Event.COMPLETE, goOnn);
                // function goOnn(e) {
                // edit mydata - it is an array of pixels
                

                // var bmd = new BitmapData(100,100, true, 0xFFCCCCCC);
                
                // bmd.setPixels(myrect, mydata);
                // console.log(onehundy);
                // frames.push(dragonBD);
                // console.log(frames.length);
                // }
            }
            frames.push(onehundy);

            var onehundys = new BitmapData("onehundy.png");
            var girlee = new BitmapData("girlsheet.png");
            girlee.loader.addEventListener(Event.COMPLETE, goOnn);
            function goOnn(e) {
                var mydata = girlee.getPixels(new Rectangle(400,0,100,100));
                onehundys.setPixels(new Rectangle(0,0,100,100), mydata);
            }
            frames.push(onehundys);


            // car	
            car = new Sprite();
            car.x = stage.stageWidth / 2;
            car.y = stage.stageHeight / 2;
            var cb = new Bitmap(frames[0]);
            cb.x = -123;
            cb.y = -50;
            cb.id = "frame1";
            car.addChild(cb);
            cb = new Bitmap(frames[1]);
            cb.x = -123;
            cb.y = -50;
            cb.id = "frame2";
            car.addChild(cb);
            // console.log(car.getChildAt(0));
            // console.log(car.getChildAt(1));

            stage.addChild(car);

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

            if(totalSeconds%2 == 0){
                car.getChildAt(0).visible = false;
                car.getChildAt(1).visible = true;
            }else{
                car.getChildAt(1).visible = false;
                car.getChildAt(0).visible = true;
            }

            counter++;

            // console.log(totalSeconds + " " + counter);


        }