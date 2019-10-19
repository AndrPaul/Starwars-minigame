// JavaScript Document
var healthDeathStar = 100;
var tie = document.getElementById('tie-fighter');
var dStar = document.getElementById('deathStar');
var tie2 = document.getElementById('tie-fighter2');
var tie3 = document.getElementById('tie-fighter3');
var container = document.getElementById('container');
var healthContainer = document.getElementById('health-container');
var health = document.getElementById('health-bar');
var deathStarLocked = true;
var hitTie = 0;
dStar.draggable = false;
tie.draggable = false;
tie2.draggable = false;
tie3.draggable = false;
/* Display image on click position */
document.onclick = userClicked;
   function userClicked() {
   var x = event.clientX - 17;
   var y = event.clientY - 17;
   var shootExplosion = document.getElementById("shoot");
   var laserSound = document.getElementById("laser");
   laserSound.play();
   shootExplosion.style.display = 'block';
   shootExplosion.style.position = 'absolute';
   shootExplosion.style.left = x + 'px';
   shootExplosion.style.top = y + 'px';
   setTimeout(function() {
     shootExplosion.style.display='none'
   }, 200);
}

/*Rotation Animation*/
x = 150 // center
y = 0 // center
r = 230 // radius
a = 0 // angle (from 0 to Math.PI * 2)


function rotate(a) {


  var px = x + r * Math.cos(a);
  var py = y + r * Math.sin(a);

  tie3.style.left = px + "px";
  tie3.style.top = py + "px";

  tie2.style.left = px + "px";
  tie2.style.top = py + "px";

  tie.style.left = px + "px";
  tie.style.top = py + "px";
}

setInterval(function() {
  a = (a + Math.PI / 360) % (Math.PI * 2);
  rotate(a);
}, 1);

/* Play Sound on Container Click
function play() {
  var shootSound = document.getElementById("shoot");
  shootSound.play();
};

 */


/* Countdown */
var timer;
var timeOutput = document.getElementById('clock');

function startGame() {
  healthDeathStar = 100;
  deathStarLocked = false;
  var timeleft = 10;
    timer = setInterval(function() {
    timeOutput.innerHTML = timeleft;
    timeleft -= 1;
    if (timeleft === 0) {
      clearInterval(timer);
      deathStarLocked = true;
      timeOutput.innerHTML = "TIME'S UP! YOU LOST";
      tie3.style.display = "none";
      tie2.style.display = "none";
      tie.style.display = "none";


    }
  }, 1000);

};




function shoot() {
  if (deathStarLocked == false) {
    healthDeathStar -= 5;
    console.log(healthDeathStar);
    health.style.width = healthDeathStar + "%";

    if (healthDeathStar === 70) {
      tie.style.display = "block";
      deathStarLocked = true;
    }

    if (healthDeathStar == 60) {
      tie2.style.display = "block";
      deathStarLocked = true;
    }
    if (healthDeathStar == 40) {
      tie3.style.display = "block";
      deathStarLocked = true;
    }

    if (healthDeathStar === 0) {
      clearInterval(timer);
      document.getElementById('deathStar').src = "img/dStarExplosion.gif";
      tie.style.display = 'none';
      tie2.style.display = 'none';
      tie3.style.display = 'none';
      document.getElementById('explosion').play();
      timeOutput.innerHTML = "YOU WON!";
      setTimeout(function() {
        dStar.style.display = 'none';
      }, 1500);

      setTimeout(function() {
        document.getElementById('victoryMusic').play();
      }, 500);
    } else if (healthDeathStar <= 20) {
      health.style.background = "linear-gradient(90deg, rgba(121,9,9,1) 0%, rgba(255,12,0,1) 100%)";


    } else if (healthDeathStar <= 50) {
      health.style.background = "linear-gradient(90deg, rgba(121,35,9,1) 0%, rgba(255,157,0,1) 100%)";
    }
  }
}

function hitTarget() {
  hitTie++;
  if (hitTie == 3) {
    document.getElementById('explosion').play();
    tie3.style.display = "none";
    tie2.style.display = "none";
    tie.style.display = "none";
    deathStarLocked = false;
    hitTie = 0;
    /* reset de aantal schoten */
  }
}

window.onload = function() {
  document.body.onselectstart = function() {
    return false;
  }
}
