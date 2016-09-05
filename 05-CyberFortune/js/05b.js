// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Only start when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

  console.log("DOM ready!");

  // Create Johnny-Five object and new Board object to work with.
  var five = nw.require("johnny-five");
  var board = new five.Board(); // Mac
  // var board = new five.Board({port: "COM6"}); // Windows

  // Add a callback to be triggered when the board is ready.
  board.on("ready", function() {

    console.log("Board ready!");

    // Create servo (pin 10)
    var servo = new five.Servo({
      pin: 10,
      center: true
    });

    document.querySelector("input").addEventListener('keyup', function(e) {

      if(e.keyCode !== 13) { return; }

      console.log("Enter!");

      // Positions (in degrees) for each answer
      let positions = {
        "yes": 30,
        "maybe": 90,
        "no": 150
      };

      // Figure out answer
      let answer = ["yes", "maybe", "no"][Math.floor(Math.random() * 3)];

      // Move servo to answer position
      servo.to(positions[answer]);

    });

  });

});
