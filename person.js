var Class = function(methods) {   
    var klass = function() {    
        this.init.apply(this, arguments);          
    };  
    
    for (var property in methods) { 
       klass.prototype[property] = methods[property];
    }
          
    if (!klass.prototype.initialize) klass.prototype.initialize = function(){};      
    
    return klass;    
};

var Person = Class({
	init: function(name){
		this.name = name;
		this.anims = {}; //{"anim's name": [bunch of ints]}
		this.frames = []; //for holding the frames we add as children when we initialize
		this.currentAnimInterval = 10; //interval in milliseconds between frames of current anim
		this.changeFrames = false; //are we allowed to change frames?
		this.currentAnim = ""; //Person's current animation
	},
	toString: function(){
		return ("Person: " + this.name);
	},
	//make a new animation and add it to this.anims
	newAnim: function(animName, spriteSheet, w, h, startsX, startsY, speed){
		var animStartFrame = this.frames.length;
		for(var i = 0; i < startsX.length; i++){
			this.addFrame(spriteSheet, startsX[i], startsY[i], w, h);
		}
		//[frame anim starts on, frame anim ends on, 
		//a variable to hold where we left off, interval]
		this.anims[animName] = [animStartFrame, animStartFrame + startsX.length, 0, 103];
		console.log(this.anims["walkDown"]);
    },
    addFrame: function(spritesheet, x, y, w, h){
        var newHund = new BitmapData("onehundy.png");
        // newHund.width = 100;
        // newHund.height = 100;
        var ss = new BitmapData(spritesheet);
        ss.loader.addEventListener(Event.COMPLETE, function (e) {
            var pixeldata = ss.getPixels(new Rectangle(x,y,w,h));
            newHund.setPixels(new Rectangle(0,0,100,100), pixeldata);
        });
        this.frames.push(newHund);
    },
    setCurrentAnimInterval: function(ms){
    	// clearInterval(this.currentAnimInterval);
    	// this.currentAnimInterval = setInterval(function(){ 
     //    	this.changeFrames = true;
    	// }, ms);
    },
    setCurrentAnim: function(animName){
    	this.currentAnim = animName;
	    if(this.anims.hasOwnProperty(animName)){
	    	this.setCurrentAnimInterval(this.anims[animName][3]);
    	}
    }
});