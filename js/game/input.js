define(['ivank'], function(ivank) {
	return function Input(player){
		this.keyOne = "";
		this.player = player;


		this.update = function(u, d, l, r, rel){
			//setCurrentAnimnimation when no movement input is being given
	        if(this.player.currentAnim == "walkRight")
	            this.player.setCurrentAnim("idleRight");
	        else if(this.player.currentAnim == "walkDown")
	            this.player.setCurrentAnim("idleDown");
	        else if(this.player.currentAnim == "walkUp")
	            this.player.setCurrentAnim("idleUp");
	        else if(this.player.currentAnim == "walkLeft")
	            this.player.setCurrentAnim("idleLeft");

	        function onlyUp(){
	            if(u && !d && !r && !l){
	                return true;
	            }
	        }
	        function onlyDown(){
	            if(!u && d && !r && !l){
	                return true;
	            }
	        }
	        function onlyLeft(){
	            if(!u && !d && !r && l){
	                return true;
	            }
	        }
	        function onlyRight(){
	            if(!u && !d && r && !l){
	                return true;
	            }
	        }

	        if(onlyUp()){
	            keyOne = "u";
	        }else if(onlyDown()){
	            keyOne = "d";
	        }else if(onlyLeft()){
	            keyOne = "l";
	        }else if(onlyRight()){
	            keyOne = "r";
	        }

	        if(r){
	            if (keyOne == "u"){
	                this.player.moveRight("walkUp");
	            }else if(keyOne == "d"){
	                this.player.moveRight("walkDown");
	            }else if(keyOne == "r"){
	                this.player.moveRight("walkRight");
	            }else if(keyOne == "l"){
	                this.player.setCurrentAnim("idleDown");
	            }
	        }
	        if (l){
	            if (keyOne == "u"){
	                this.player.moveLeft("walkUp");
	            }else if(keyOne == "d"){
	                this.player.moveLeft("walkDown");
	            }else if(keyOne == "r"){
	                this.player.setCurrentAnim("idleDown");
	            }else if(keyOne == "l"){
	                this.player.moveLeft("walkLeft");
	            }
	        }
	        if (u){
	            if (keyOne == "u"){
	                this.player.moveUp("walkUp");
	            }else if(keyOne == "d"){
	                this.player.setCurrentAnim("idleDown");
	            }else if(keyOne == "r"){
	                this.player.moveUp("walkRight");
	            }else if(keyOne == "l"){
	                this.player.moveUp("walkLeft");
	            }
	        }
	        if (d){
	            if (keyOne == "u"){
	                this.player.setCurrentAnim("idleDown");
	            }else if(keyOne == "d"){
	                this.player.moveDown("walkDown");
	            }else if(keyOne == "r"){
	                this.player.moveDown("walkRight");
	            }else if(keyOne == "l"){
	                this.player.moveDown("walkLeft");
	            }
	        }
	        
	        if (rel) window.location.reload(false);
		};
	};
});