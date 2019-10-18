// JavaScript Document

var healthDeathStar = 100;
var tie = document.getElementById('tie-fighter');
var widthTie = tie.offsetWidth;
var heightTie = tie.offsetHeight;
var positionLeft = Math.floor(Math.random() * (window.innerWidth - widthTie));
var positionTop = Math.floor(Math.random() * (window.innerHeight - heightTie));
var health = document.getElementById('health-bar');
var deathStarLocked = false;
var hitTie = 0;
tie.style.display = 'none';

/*console.log(widthTie);*/


/* Clock */
var time = 10;
var timeOutput = document.getElementById('clock');
timeOutput.innerHTML = time;
var activeClock = setInterval(function () {
    if (time != 0) {
        time--;
        timeOutput.innerHTML = time;
    } else {
        clearInterval(activeClock);
        deathStarLocked = true;
        if (healthDeathStar !== 0) {
            document.getElementById('loserMusic').play();
            document.getElementById("status").innerHTML = "YOU LOST";

        }
    }
}, 1000);



function shoot() {
    if (deathStarLocked == false) {
        healthDeathStar -= 10;
        console.log(healthDeathStar);
        document.getElementById('health-bar').style.width = healthDeathStar + "%";

        if (healthDeathStar === 70) {
            tie.style.display = "inline";
            tie.style.top = positionTop + "px";
            tie.style.left = positionLeft + "px";
            deathStarLocked = true;
        }

        if (healthDeathStar === 0) {
            clearInterval(activeClock);
            document.getElementById('deathStar').src = "img/explosion.gif";
            tie.style.display = 'none';
            document.getElementById('explosion').play();
            document.getElementById("status").innerHTML = "YOU WON";
            setTimeout(function () {
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
        tie.style.display = "none";
        deathStarLocked = false;
        hitTie = 0;
        /* reset de aantal schoten */
    }
}
