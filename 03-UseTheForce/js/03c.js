// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Array of all particles
var particles = [];

// Wait for DOM to be ready
window.addEventListener("DOMContentLoaded", function() {

  console.log("DOM ready!");

  // Retrieve canvas and drawing context
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');

  // Make canvas full screen
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create Johnny-Five object and new Board object to work with.
  var five = nw.require("johnny-five");
  var board = new five.Board(); // Mac
  // var board = new five.Board({port: "COM6"}); // Windows

  // Add a callback to be triggered when the board is ready.
  board.on("ready", function() {

    // If we see this in the console, we know the board is ready. Light up the LED!
    console.log("Board ready!");
    var led = new five.Led(13);
    led.on();

    // Create a Proximity object for our Sharp distance sensor (analog input 0).
    var proximity = new five.Proximity({
      controller: "2Y0A21",
      pin: "A0"
    });

    // Add a callback function to be executed when distance data is received.
    proximity.within([8, 65], "cm", function() {

      // console.log(this.cm);

      // Create a bunch of particles
      for (var i = 0; i < 5; i++) {
        var particle = new Particle(
          {
            x: canvas.width/2,
            y: canvas.height/2,
            radius: 5,
            speed: 10,
            color: "#FFFFFF"
          }
        );
        particles.push(particle);
      }

      // console.log(particles.length);

    });

  });

  // Start renderer
  Particle.startRendering(context, particles);

});
