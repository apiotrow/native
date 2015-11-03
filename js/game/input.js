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




	        //code below keeps the player facing the U, D, L, or R
	        //direction they were walking in when a second directional
	        //button is pressed. makes the second button cause a "strafe"


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
	                keyOne = "r"; //prevents moonwalking when pressing 3 keys
	                this.player.moveRight("walkRight");
	            }
	        }
	        if (l){
	            if (keyOne == "u"){
	                this.player.moveLeft("walkUp");
	            }else if(keyOne == "d"){
	                this.player.moveLeft("walkDown");
	            }else if(keyOne == "r"){
	            	keyOne = "l"; //prevents moonwalking when pressing 3 keys
	                this.player.moveLeft("walkRight");
	            }else if(keyOne == "l"){
	                this.player.moveLeft("walkLeft");
	            }
	        }
	        if (u){
	            if (keyOne == "u"){
	                this.player.moveUp("walkUp");
	            }else if(keyOne == "d"){
	                this.player.moveUp("walkDown");
	            }else if(keyOne == "r"){
	                this.player.moveUp("walkRight");
	            }else if(keyOne == "l"){
	                this.player.moveUp("walkLeft");
	            }
	        }
	        if (d){
	            if (keyOne == "u"){
	                this.player.moveDown("walkUp");
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