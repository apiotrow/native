define("Person",["ivank"], function(h) {
	return function Person(name, stage, width, height, spriteSheet, isNpc){
		this.isNpc = isNpc;
		this.walkSpeed = 3;
		this.spriteSheet = spriteSheet;
		this.frameWidth = width;
		this.frameHeight = height;
		this.framesInfo = {};
		this.name = name;
		this.anims = {}; //{"anim's name": [bunch of ints]}
		this.frames = []; //for holding the frames we add as children when we initialize
		this.currentAnimInterval = 10; //interval in milliseconds between frames of current anim
		this.nextFrame = false; //are we allowed to change frames?
		this.currentAnim = "idleDown"; //Person's current animation
		this.sprite = new Sprite();
		this.lastTime = rpgGlobs.time;
		this.boundingBox = new Sprite();
		this.canMoveLeft = true;
		this.canMoveUp = true;
		this.canMoveRight = true;
		this.canMoveDown = true;

    	stage.addChild(this.boundingBox);

		this.update = function(persons){
			this.drawBoundingBox();

			this.canMoveLeft = true;
			this.canMoveUp = true;
			this.canMoveRight = true;
			this.canMoveDown = true;

			if(!this.isNpc){
				for(var i = 0; i < persons.length; i++){
					if(persons[i] != this){
						if(this.sprite.hitTestObject(persons[i].sprite)){
							
							var other = persons[i].sprite;
							var me = this.sprite;
							var threshold = 2;

							// console.log(other.x - me.x);

							if(me.x > other.x){
								this.canMoveLeft = false;
							}
							if(me.y > other.y && (other.x - me.x) < (me.width - threshold)){
								this.canMoveUp = false;
							}
							if(me.x < other.x){
								this.canMoveRight = false;
							}
							if(me.y < other.y && (other.y - me.y) > (me.width - threshold)){
								this.canMoveDown = false;
							}
						}
					}
				}
			}

			//if we're allowed to change to the next frame, and the animation we've set
		    //actually exists
		    if(this.lastTime < rpgGlobs.time && this.anims.hasOwnProperty(this.currentAnim)){
		        //set all frames to invisible, except the one we're on
		        for(var j = 0; j < this.sprite.numChildren; j++){

		            this.sprite.getChildAt(j).visible = false;
		            if(j == this.anims[this.currentAnim][2]){
		                this.sprite.getChildAt(j).visible = true;

		            }
		        }

		        //reset time
		        this.lastTime = rpgGlobs.time;

		        //increment frame counter
		        this.anims[this.currentAnim][2]++;

		        //if frame counter is on last frame, reset it to the first one
		        if(this.anims[this.currentAnim][2] >= this.anims[this.currentAnim][1]){
		            this.anims[this.currentAnim][2] = this.anims[this.currentAnim][0];
		        }
		    }
		};
		this.drawBoundingBox = function(){
			with(this.boundingBox.graphics){
				clear();
				beginFill(0xFF0000);
				var x = this.sprite.getBounds(this.sprite.parent).x;
				var y = this.sprite.getBounds(this.sprite.parent).y;
				var w = this.sprite.getBounds(this.sprite.parent).width;
				var h = this.sprite.getBounds(this.sprite.parent).height;

				var lineWidth = 2;

				drawRect(x, y, w, lineWidth);
				drawRect(x, y + h, w, lineWidth);
				drawRect(x + w, y, lineWidth, h);
				drawRect(x, y, lineWidth, h);


			}
		};
		//make a new animation and add it to this.anims
		this.newAnim = function(args){
			var animStartFrame = this.frames.length;
			for(var i = 0; i < args.frameCoords.length; i++){
				this.addFrame(
					this.spriteSheet, 
					args.frameCoords[i][0], 
					args.frameCoords[i][1], 
					this.frameWidth, 
					this.frameHeight
				);
			}
			this.anims[args.animName] = [
				animStartFrame, 
				animStartFrame + args.frameCoords.length, 
				animStartFrame, 
				args.speed
			];
	    };
	    //take everything from this.framesInfo and makes frames
	    //out of it
	    this.createAnims = function(){
	    	for(var anim in this.framesInfo){
	    		this.newAnim({
	    			animName: anim, 
        			frameCoords: this.framesInfo[anim].frameCoords, 
        			speed: this.framesInfo[anim].speed
        		});
	    	};
	    };
	    //cut out a frame from a spritesheet and push it to this.frames
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
	    this.setupSprite = function(x, y){
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
	    this.moveDown = function(anim){
	    	if(this.canMoveDown){
				this.sprite.y += this.walkSpeed;
			}
	        this.setCurrentAnim(anim);
	    };
	    this.moveUp = function(anim){
	    	if(this.canMoveUp){
				this.sprite.y -= this.walkSpeed;
			}
	        this.setCurrentAnim(anim);
	    };
	    this.moveLeft =  function(anim){
	    	if(this.canMoveLeft){
	    		this.sprite.x -= this.walkSpeed;
	    	}
			
	        this.setCurrentAnim(anim);
	    };
	    this.moveRight = function(anim){
	    	if(this.canMoveRight){
				this.sprite.x += this.walkSpeed;
			}
	        this.setCurrentAnim(anim);
	    };

	};
});
