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
var victorySound = document.getElementById('victoryMusic');
var explosionSound = document.getElementById('explosionMusic');
var losingSound = document.getElementById('loserMusic');

dStar.draggable = false;
tie.draggable = false;
tie2.draggable = false;
tie3.draggable = false;


/* Display image / Play sound on click position */
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




/* Countdown timer*/
var second = 15;
var timeOutFunction;
var timeOutput = document.getElementById('timer');
timeOutput.innerHTML = second;
function setTimer()
{
    second--;
    timeOutput.innerHTML = second;
    if(second <= 0){
      clearInterval(timeOutFunction);
      timeOutput.innerHTML = "TIME'S UP! YOU LOST";
      losingSound.play();
      deathStarLocked = true;
      tie3.style.display = "none";
      tie2.style.display = "none";
      tie.style.display = "none";
    }
}

function startGame() {
  deathStarLocked = false;
  timeOutFunction = setInterval(setTimer, 1000);
}



function shoot() {
  if (deathStarLocked == false) {
    healthDeathStar -= 5;
    console.log(healthDeathStar);
    health.style.width = healthDeathStar + "%";

    if (healthDeathStar === 70) {
      tie.style.display = "block";
      deathStarLocked = true;
    }

    if (healthDeathStar == 50) {
      tie2.style.display = "block";
      deathStarLocked = true;
    }
    if (healthDeathStar == 30) {
      tie3.style.display = "block";
      deathStarLocked = true;
    }

    if (healthDeathStar === 0) {
      clearInterval(timeOutFunction);
      dStar.src = "img/dStarExplosion.gif";
      tie.style.display = 'none';
      tie2.style.display = 'none';
      tie3.style.display = 'none';
      explosionSound.play();
      timeOutput.innerHTML = "YOU WON!";
      setTimeout(function() {
        dStar.style.display = 'none';
      }, 1500);

      setTimeout(function() {
        victorySound.play();
      }, 500);
    } else if (healthDeathStar <= 20) {
      health.style.background = "linear-gradient(90deg, rgba(121,9,9,1) 0%, rgba(255,12,0,1) 100%)";


    } else if (healthDeathStar <= 50) {
      health.style.background = "linear-gradient(90deg, rgba(121,35,9,1) 0%, rgba(255,157,0,1) 100%)";
    }
  }
}

function hitTieOne() {
  hitTie++;
  if (hitTie == 4) {
    explosionSound.play();

    setTimeout(function() {
        tie.style.display = "none";
    }, 1000);
    tie.src = "img/explosion.gif";

    deathStarLocked = false;
    hitTie = 0;
    /* reset de aantal schoten */
  }
}
function hitTieTwo() {
  hitTie++;
  if (hitTie == 6) {
    explosionSound.play();

    setTimeout(function() {
        tie2.style.display = "none";
    }, 1000);
    tie2.src = "img/explosion.gif";

    deathStarLocked = false;
    hitTie = 0;
    /* reset de aantal schoten */
  }
}
function hitTieThree() {
  hitTie++;
  if (hitTie == 8) {
    explosionSound.play();
    tie3.src = "img/explosion.gif";

    setTimeout(function() {
        tie3.style.display = "none";
    }, 1000);

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
