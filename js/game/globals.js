rpgGlobs = {
	time: 0,
	Class: function(methods) {   
	    var klass = function() {    
	        this.init.apply(this, arguments);          
	    };  
	    
	    for (var property in methods) { 
	       klass.prototype[property] = methods[property];
	    }
	          
	    if (!klass.prototype.initialize) klass.prototype.initialize = function(){};      
	    
	    return klass;    
	},
}

