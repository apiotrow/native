define("Person", function() {


	return function Person(name){
		this.name = name;
		this.anims = {}; //{"anim's name": [bunch of ints]}
		this.frames = []; //for holding the frames we add as children when we initialize
		this.currentAnimInterval = 10; //interval in milliseconds between frames of current anim
		this.nextFrame = false; //are we allowed to change frames?
		this.currentAnim = "idleDown"; //Person's current animation
		this.sprite = new Sprite();
		this.lastTime = time;
		this.direction = "down";
		this.x = this.sprite.x;
		this.y = this.sprite.y;
		this.walkSpeed = 3;

		this.update = function(){
			this.x = this.sprite.x;
			this.y = this.sprite.y;

			//if we're allowed to change to the next frame, and the animation we've set
		    //actually exists
		    if(this.lastTime < time && this.anims.hasOwnProperty(this.currentAnim)){
		        //set all frames to invisible, except the one we're on
		        for(var j = 0; j < this.sprite.numChildren; j++){
		            this.sprite.getChildAt(j).visible = false;
		            if(j == this.anims[this.currentAnim][2]){
		                this.sprite.getChildAt(j).visible = true;
		            }
		        }

		        //reset time
		        this.lastTime = time;

		        //increment frame counter
		        this.anims[this.currentAnim][2]++;

		        //if frame counter is on last frame, reset it to the first one
		        if(this.anims[this.currentAnim][2] >= this.anims[this.currentAnim][1]){
		            this.anims[this.currentAnim][2] = this.anims[this.currentAnim][0];
		        }
		    }
		};
				//make a new animation and add it to this.anims
		this.newAnim = function(animName, spriteSheet, w, h, startsX, startsY, speed){
			var animStartFrame = this.frames.length;
			for(var i = 0; i < startsX.length; i++){
				this.addFrame(spriteSheet, startsX[i], startsY[i], w, h);
			}
			//[frame anim starts on, frame anim ends on, 
			//a variable to hold where we left off, interval]
			this.anims[animName] = [animStartFrame, animStartFrame + startsX.length, animStartFrame, 103];
			// console.log(this.anims["walkDown"]);
	    };
	    this.addFrame = function(spritesheet, x, y, w, h){
	        var newHund = new BitmapData("assets/sprites/onehundy.png");
	        var ss = new BitmapData(spritesheet);
	        ss.loader.addEventListener(Event.COMPLETE, function (e) {
	            var pixeldata = ss.getPixels(new Rectangle(x,y,w,h));
	            newHund.setPixels(new Rectangle(0,0,100,100), pixeldata);
	        });
	        this.frames.push(newHund);
	    };
	    this.setCurrentAnim = function(animName){
	    	this.currentAnim = animName;
	    };
	    this.setupPlayerSprite = function(x, y){
	        this.sprite = new Sprite();
	        this.sprite.x = x;
	        this.sprite.y = y;
	        var tempBitmap;
	        for(var i = 0; i < this.frames.length; i++){
	            tempBitmap = new Bitmap(this.frames[i]);
	            tempBitmap.x = -123;
	            tempBitmap.y = -50;
	            this.sprite.addChild(tempBitmap);
	        }
	    };
	    this.moveDown = function(){
			this.sprite.y += this.walkspeed;
	        player.setCurrentAnim("walkDown");
	    };
	    this.moveUp = function(){
			this.sprite.y -= this.walkspeed;
	        player.setCurrentAnim("walkUp");
	    };
	    this.moveLeft =  function(){
			this.sprite.x -= this.walkspeed;
	        player.setCurrentAnim("walkLeft");
	    };
	    this.moveRight = function(){
			this.sprite.x += this.walkspeed;
	        player.setCurrentAnim("walkRight");
	    };

	};



	// var Person = Class({
	// 	init: function(name){
	// 		this.name = name;
	// 		this.anims = {}; //{"anim's name": [bunch of ints]}
	// 		this.frames = []; //for holding the frames we add as children when we initialize
	// 		this.currentAnimInterval = 10; //interval in milliseconds between frames of current anim
	// 		this.nextFrame = false; //are we allowed to change frames?
	// 		this.currentAnim = "idleDown"; //Person's current animation
	// 		this.sprite = new Sprite();
	// 		this.lastTime = time;
	// 		this.direction = "down";
	// 		this.x = this.sprite.x;
	// 		this.y = this.sprite.y;
	// 		this.walkSpeed = 3;
	// 	},
	// 	update: function(){
	// 		this.x = this.sprite.x;
	// 		this.y = this.sprite.y;

	// 		//if we're allowed to change to the next frame, and the animation we've set
	// 	    //actually exists
	// 	    if(this.lastTime < time && this.anims.hasOwnProperty(this.currentAnim)){
	// 	        //set all frames to invisible, except the one we're on
	// 	        for(var j = 0; j < this.sprite.numChildren; j++){
	// 	            this.sprite.getChildAt(j).visible = false;
	// 	            if(j == this.anims[this.currentAnim][2]){
	// 	                this.sprite.getChildAt(j).visible = true;
	// 	            }
	// 	        }

	// 	        //reset time
	// 	        this.lastTime = time;

	// 	        //increment frame counter
	// 	        this.anims[this.currentAnim][2]++;

	// 	        //if frame counter is on last frame, reset it to the first one
	// 	        if(this.anims[this.currentAnim][2] >= this.anims[this.currentAnim][1]){
	// 	            this.anims[this.currentAnim][2] = this.anims[this.currentAnim][0];
	// 	        }
	// 	    }
	// 	},
	// 	toString: function(){
	// 		return ("Person: " + this.name);
	// 	},
	// 	//make a new animation and add it to this.anims
	// 	newAnim: function(animName, spriteSheet, w, h, startsX, startsY, speed){
	// 		var animStartFrame = this.frames.length;
	// 		for(var i = 0; i < startsX.length; i++){
	// 			this.addFrame(spriteSheet, startsX[i], startsY[i], w, h);
	// 		}
	// 		//[frame anim starts on, frame anim ends on, 
	// 		//a variable to hold where we left off, interval]
	// 		this.anims[animName] = [animStartFrame, animStartFrame + startsX.length, animStartFrame, 103];
	// 		// console.log(this.anims["walkDown"]);
	//     },
	//     addFrame: function(spritesheet, x, y, w, h){
	//         var newHund = new BitmapData("assets/sprites/onehundy.png");
	//         var ss = new BitmapData(spritesheet);
	//         ss.loader.addEventListener(Event.COMPLETE, function (e) {
	//             var pixeldata = ss.getPixels(new Rectangle(x,y,w,h));
	//             newHund.setPixels(new Rectangle(0,0,100,100), pixeldata);
	//         });
	//         this.frames.push(newHund);
	//     },
	//     setCurrentAnim: function(animName){
	//     	this.currentAnim = animName;
	//     },
	//     setupPlayerSprite: function(x, y){
	//         this.sprite = new Sprite();
	//         this.sprite.x = x;
	//         this.sprite.y = y;
	//         var tempBitmap;
	//         for(var i = 0; i < this.frames.length; i++){
	//             tempBitmap = new Bitmap(this.frames[i]);
	//             tempBitmap.x = -123;
	//             tempBitmap.y = -50;
	//             this.sprite.addChild(tempBitmap);
	//         }
	//     },
	//     moveDown: function(){
	// 		this.sprite.y += this.walkspeed;
	//         player.setCurrentAnim("walkDown");
	//     },
	//     moveUp: function(){
	// 		this.sprite.y -= this.walkspeed;
	//         player.setCurrentAnim("walkUp");
	//     },
	//     moveLeft:  function(){
	// 		this.sprite.x -= this.walkspeed;
	//         player.setCurrentAnim("walkLeft");
	//     },
	//     moveRight: function(){
	// 		this.sprite.x += this.walkspeed;
	//         player.setCurrentAnim("walkRight");
	//     },
	// });
	return{ Person: Person};
});
