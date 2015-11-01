var stage, car, angle = 0,
            speed = 0;
        var l, r, u, d, rel;

        function Start() {
            stage = new Stage("c");

            // background
            var s = new Sprite();
            s.graphics.beginBitmapFill(new BitmapData("asphalt.jpg"));
            s.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
            stage.addChild(s);

            // car			
            car = new Sprite();
            car.x = stage.stageWidth / 2;
            car.y = stage.stageHeight / 2;
            var cb = new Bitmap(new BitmapData("ff.png"));
            cb.x = -123;
            cb.y = -50;
            car.addChild(cb);

            stage.addChild(car);

            // events
            stage.addEventListener(KeyboardEvent.KEY_DOWN, onKD);
            stage.addEventListener(KeyboardEvent.KEY_UP, onKU);
            stage.addEventListener(Event.ENTER_FRAME, onEF);
        }

        function onKD(e) {
            console.log(e.keyCode);
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
            speed *= 0.9;
            // if (u) speed += 1 + speed * 0.06;
            // if (d) speed -= 1;

            // if (r) angle += speed * 0.003;
            // if (l) angle -= speed * 0.003;

            // car.rotation = angle * 180 / Math.PI;
            // car.x += Math.cos(angle) * speed;
            // car.y += Math.sin(angle) * speed;

            if (u) car.y -= 1;
            if (d) car.y += 1;

            if (r) car.x += 1;
            if (l) car.x -= 1;
            if (rel) window.location.reload(false);

        }