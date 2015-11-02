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
	init: function(name, anims){
		this.name = name;
		this.anims = {};
		this.frames = [];
	},
	toString: function(){
		return ("Person " + this.name);
	},
	newAnim: function(animName, spriteSheet, w, h, startsX, startsY){
		for(var i = 0; i < startsX.length; i++){
			this.addFrame(spriteSheet, startsX[i], startsY[i], w, h);
		}


        // addFrame(spriteSheet, 100, 0, 100, 100);
        // addFrame(spriteSheet, 200, 0, 100, 100);
        // addFrame(spriteSheet, 300, 0, 100, 100);
        // addFrame(spriteSheet, 400, 0, 100, 100);
        // addFrame(spriteSheet, 500, 0, 100, 100);
        // addFrame(spriteSheet, 600, 0, 100, 100);
    },
    addFrame: function(spritesheet, x, y, w, h){
        var newHund = new BitmapData("onehundy.png");
        var ss = new BitmapData(spritesheet);
        ss.loader.addEventListener(Event.COMPLETE, function (e) {
            var pixeldata = ss.getPixels(new Rectangle(x,y,w,h));
            newHund.setPixels(new Rectangle(0,0,100,100), pixeldata);
        });
        // frames.push(newHund);
        this.frames.push(newHund);
    }
});