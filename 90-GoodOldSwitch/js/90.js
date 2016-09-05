// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Only start when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

  var value = document.querySelector("#value");

  var five = nw.require("johnny-five");
  new five.Board().on("ready", function() {

    console.log("ready");

    // Create a button object. This can be used with the tactile switches or with the tilt switch
    // bundled in the kit. You can also use it with any standard button. One leg of the button must
    // be wired to 8 and the other to GND. We use the Arduino's built-in pull-up resistor so we
    // don't have to wire our own.
    var button = new five.Button({
      pin: 8,
      isPullup: true
    });

    button.on("press", function() {
      console.log("press");
      value.innerHTML = "PRESS";
    });

    button.on("hold", function() {
      console.log("hold");
      value.innerHTML = "HOLD";
    });

    button.on("release", function() {
      console.log("release");
      value.innerHTML = "RELEASE";
    });

  });

});