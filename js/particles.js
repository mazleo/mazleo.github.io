/*
 * PARTICLES JS
 * By Jonnelin Marzielli Leonardo AKA Mazleo
 */

/*
 * DIRECTION IDs of particles
 * 1: Up
 * 2: Right
 * 3: Down
 * 4: Left
 * 5: Upper-right
 * 6: Lower-right
 * 7: Lower-left
 * 8: Upper-left
 */

// Get container div
var container = document.getElementById("particles-js");

// Add canvas element as child of container div
container.innerHTML = "<canvas id='canvas'></canvas>";

// Get canvas and set width and height
var canvas = document.getElementById("canvas");
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

// Get context
var ctx = canvas.getContext("2d");

/*----- Global variables -----*/
var CONNECTION_RADIUS = 70;

/*----- Properties of particle object -----*/
// Position; contained within canvas width and height
var xPos;
var yPos;
// Direction
var direction;
// Speed; between 0.5 - 0.8
var speed;
// Particle opacity; between 0 - 0.5
var particleOpacity
// Line Opacity; between 0.1 - 0.3
var connectionOpacity
// Particle size; between 0 - 3.5
var size;
/*------------------------------------------*/

// Random number of particles ranges depending on window size
var numParticles;
var numParticlesRowsMin;
var numParticlesColumnsMin;
var numParticlesRowsMax;
var numParticlesColumnsMax;
var numParticlesMin;
var numParticlesMax;

// Array of particle objects
var particles;

numParticlesColumnsMin = canvas.width / 55;
numParticlesRowsMin = canvas.height / 55;
numParticlesColumnsMax = canvas.width / 45;
numParticlesRowsMax = canvas.height / 45;

numParticlesMin = numParticlesColumnsMin * numParticlesRowsMin;
numParticlesMax = numParticlesColumnsMax * numParticlesRowsMax;

numParticles = Math.round((Math.random() * (numParticlesMax - numParticlesMin)) + numParticlesMin);

particles = new Array();
for (var n = 0; n < numParticles; n++) {
  particles.push(new Particle());
}

animate();

/*
 * Constructor for each particle object
 */
function Particle() {
  this.xPos = Math.random() * canvas.width;
  this.yPos = Math.random() * canvas.height;
  this.direction = Math.ceil(Math.random() * 8);

  this.speed = (Math.random() * 0.3) + 0.1;

  this.particleOpacity = Math.random() * 0.5;

  this.connectionOpacity = (Math.random() * 0.3) + 0.2;

  this.size = Math.random() * 3.5;
}

/*
 * Animates particles
 */
function animate() {
  // Clear old drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var p = 0; p < numParticles; p++) {
    // Draw single particle
    drawParticle(particles[p]);
    changeParticlePos(particles[p]);

    // Draw lines to all other particles
    for(var n = 0; n < numParticles; n++) {
      if (isWithinConnectionRadius(particles[p], particles[n])) {
        drawLine(particles[p], particles[n]);
      }
    }
  }

  requestAnimationFrame(animate);
}

/*
 * Draws a single particle, given a particle object
 */
function drawParticle(particle) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(255, 255, 255, " + particle.particleOpacity + ")";
  ctx.arc(particle.xPos, particle.yPos, particle.size, 0, Math.PI * 2, true);
  ctx.fill();
}

/*
 * Draws a line connecting 2 particles, given 2
 * particle objects
 */
function drawLine(particle, particleOther) {
  ctx.strokeStyle = "rgba(255, 255, 255, " + particleOther.connectionOpacity + ")";
  ctx.lineWidth = 0.2;
  ctx.beginPath();
  ctx.moveTo(particle.xPos, particle.yPos);
  ctx.lineTo(particleOther.xPos, particleOther.yPos);
  ctx.stroke();
}

function isWithinConnectionRadius(particle, particleOther) {
  var xDistance = Math.abs(particle.xPos - particleOther.xPos);
  var yDistance = Math.abs(particle.yPos - particleOther.yPos);
  var connectionDistance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

  if (connectionDistance <= CONNECTION_RADIUS) {
    return true;
  }
  else {
    return false;
  }
}

/*
 * Changes the particle position to next position after
 * animating one frame
 */
function changeParticlePos(particle) {
  if (particle.xPos < 0 || particle.xPos > canvas.width || particle.yPos < 0 || particle.yPos > canvas.height) {
    particle.xPos = Math.random() * canvas.width;
    particle.yPos = Math.random() * canvas.height;
  }
  else {
    switch (particle.direction) {
      case 1:
        particle.yPos -= particle.speed;
        break;
      case 2:
        particle.xPos += particle.speed;
        break;
      case 3:
        particle.yPos += particle.speed;
        break;
      case 4:
        particle.xPos -= particle.speed;
        break;
      case 5:
        particle.xPos += particle.speed;
        particle.yPos -= particle.speed;
        break;
      case 6:
        particle.xPos += particle.speed;
        particle.yPos += particle.speed;
        break;
      case 7:
        particle.xPos -= particle.speed;
        particle.yPos += particle.speed;
        break;
      case 8:
        particle.xPos -= particle.speed;
        particle.yPos -= particle.speed;
        break;
      default:
        break;
    }
  }
}
