// Images and divs
var dStar = document.getElementById('deathStar');
var tie = document.getElementById('tie-fighter');
var healthTie1 = document.getElementById('healthTie1');
var healthTie2 = document.getElementById('healthTie2');
var healthTie3 = document.getElementById('healthTie3');
var healthTieContainer = document.getElementsByClassName('healthTieContainer');
var tie2 = document.getElementById('tie-fighter2');
var tie3 = document.getElementById('tie-fighter3');
var tie1img = document.getElementById('tie1img');
var tie2img = document.getElementById('tie2img');
var tie3img = document.getElementById('tie3img');
var container = document.getElementById('container');
var healthContainer = document.getElementById('health-container');
var health = document.getElementById('health-bar');
var shootExplosion = document.getElementById("shoot");
var timeOutput = document.getElementById('timer');
var startBtn = document.getElementById('start');
dStar.draggable = false;
tie1img.draggable = false;
tie2img.draggable = false;
tie3img.draggable = false;
// Audio
var victorySound = document.getElementById('victoryMusic');
var explosionSound = document.getElementById('explosionMusic');
var losingSound = document.getElementById('loserMusic');
var laserSound = document.getElementById("laser");
var impactSound = document.getElementById("impact");
explosionSound.volume = 0.5;
losingSound.volume = 0.6;
victorySound.volume = 0.5;
laserSound.volume = 0.1;
impactSound.volume = 0.5;

// Game parameters
var healthDeathStar;
var deathStarLocked;
var hitTie;



/* Display image / Play sound on click position */
document.onclick = userClicked;

function userClicked() {
  var x = event.clientX - 17;
  var y = event.clientY - 17;
  laserSound.play();
  shootExplosion.style.display = 'block';
  shootExplosion.style.position = 'absolute';
  shootExplosion.style.left = x + 'px';
  shootExplosion.style.top = y + 'px';
  setTimeout(function() {
    shootExplosion.style.display = 'none';
  }, 200);
}

/*Rotation Animation*/
x = 100 // center
y = -100 // center
r = 250 // radius
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


function setTimer() {
  second--;
  timeOutput.innerHTML = second;
  if (second <= 0) {
    clearInterval(timeOutFunction);
    timeOutput.innerHTML = "TIME'S UP! YOU LOST";
    losingSound.play();
    deathStarLocked = true;
    tie3.style.display = "none";
    tie2.style.display = "none";
    tie.style.display = "none";
    setTimeout(function() {
      startBtn.disabled = false;
      startBtn.innerHTML = "PLAY AGAIN";
    }, 1500);
  }
}


function startGame() {

  startBtn.disabled = true;
  btnLocked = true;
  timeOutput.innerHTML = "GAME LOADING";
  startBtn.innerHTML = "GAME IN PROGRESS";
  healthTie1.innerHTML = 4;
  healthTie2.innerHTML = 6;
  healthTie3.innerHTML = 8;
  second = 15;
  hitTie = 0;
  healthDeathStar = 100;
  health.style.width = 100 + "%";
  health.style.background = "linear-gradient(90deg, rgba(45,121,9,1) 0%, rgba(155,255,0,1) 100%)";
  dStar.style.display = 'block';
  dStar.src = "img/deathStar.png";
  tie1img.src = "img/tie-fighter.png";
  tie2img.src = "img/tie-fighter2.png";
  tie3img.src = "img/tie-fighter3.png";
  var w = 0;
  var h = 0;
  setTimeout(function() {
    timeOutFunction = setInterval(setTimer, 1000);
    deathStarLocked = false;
    healthContainer.style.display = 'block';
    timeOutput.innerHTML = second;
  }, 1000);

  var growDeathStar = setInterval(function() {
    if (w > 280)
      clearInterval(growDeathStar);
    w = w + 5;
    h = h + 5;
    dStar.style.width = w + 'px';
    dStar.style.height = h + 'px';
  }, 20);

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

      dStar.src = "img/dStarExplosion.gif";
      clearInterval(timeOutFunction);
      tie.style.display = 'none';
      tie2.style.display = 'none';
      tie3.style.display = 'none';
      healthContainer.style.display = "none";
      explosionSound.play();
      timeOutput.innerHTML = "YOU WON!";
      setTimeout(function() {
        dStar.style.display = 'none';
        startBtn.disabled = false;
        startBtn.innerHTML = "PLAY AGAIN";
      }, 1500);
      setTimeout(function() {
        victorySound.play();
      }, 200);
    } else if (healthDeathStar <= 30) {
      health.style.background = "linear-gradient(90deg, rgba(121,9,9,1) 0%, rgba(255,12,0,1) 100%)";


    } else if (healthDeathStar <= 50) {
      health.style.background = "linear-gradient(90deg, rgba(121,35,9,1) 0%, rgba(255,157,0,1) 100%)";
    }
  }
}

function hitTieOne() {

  hitTie++;
  healthTie1.innerHTML = 4 - hitTie;
  if (hitTie == 4) {
    for (var i = 0; i < healthTieContainer.length; i += 1) {
      healthTieContainer[i].style.display = 'none';
    }
    explosionSound.play();

    setTimeout(function() {
      tie.style.display = "none";
      for (var i = 0; i < healthTieContainer.length; i += 1) {
        healthTieContainer[i].style.display = 'block';
      }
    }, 1000);
    tie1img.src = "img/explosion.gif";
    deathStarLocked = false;
    hitTie = 0;
    /* reset de aantal schoten */
  }
}

function hitTieTwo() {
  hitTie++;
  healthTie2.innerHTML = 6 - hitTie;
  if (hitTie == 6) {
    for (var i = 0; i < healthTieContainer.length; i += 1) {
      healthTieContainer[i].style.display = 'none';
    }
    explosionSound.play();
    tie2img.disabled = true;

    setTimeout(function() {
      tie2.style.display = "none";
      for (var i = 0; i < healthTieContainer.length; i += 1) {
        healthTieContainer[i].style.display = 'block';
      }
    }, 1000);
    tie2img.src = "img/explosion.gif";
    deathStarLocked = false;
    hitTie = 0;
    /* reset de aantal schoten */
  }
}

function hitTieThree() {
  hitTie++;
  healthTie3.innerHTML = 8 - hitTie;
  if (hitTie == 8) {
    for (var i = 0; i < healthTieContainer.length; i += 1) {
      healthTieContainer[i].style.display = 'none';
    }
    tie3img.disabled = true;
    explosionSound.play();
    tie3img.src = "img/explosion.gif";

    setTimeout(function() {
      tie3.style.display = "none";
      for (var i = 0; i < healthTieContainer.length; i += 1) {
        healthTieContainer[i].style.display = 'block';
      }
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
