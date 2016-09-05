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

    var joystick = new five.Joystick({
      pins: ["A0", "A1"] // [ x, y ]
    });

    joystick.on("change", function() {
      console.log(this.x, this.y);
      value.innerHTML = "x:" + this.x + "  y: " + this.y;
    });

  });

});