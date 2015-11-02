
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

function playerMovement(){
    //animation when no movement input is being given
    if(player.currentAnim == "walkRight")
        player.setCurrentAnim("idleRight");
    else if(player.currentAnim == "walkDown")
        player.setCurrentAnim("idleDown");
    else if(player.currentAnim == "walkUp")
        player.setCurrentAnim("idleUp");
    else if(player.currentAnim == "walkLeft")
        player.setCurrentAnim("idleLeft");

    if (u){
        player.sprite.y -= walkspeed;
        player.setCurrentAnim("walkUp");
    }
    if (d){
        player.sprite.y += walkspeed;
        player.setCurrentAnim("walkDown");
    }
    if (r){
        player.sprite.x += walkspeed;
        player.setCurrentAnim("walkRight");
    }
    if (l){
        player.sprite.x -= walkspeed;
        player.setCurrentAnim("walkLeft");
    }
    if (rel) window.location.reload(false);
}