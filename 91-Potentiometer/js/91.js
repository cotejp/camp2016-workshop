// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Only start when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

  var value = document.querySelector("#value");

  var five = nw.require("johnny-five");
  new five.Board().on("ready", function() {

    // The potentiometer must be wired as such: left pin to GND, middle pin to A3 and right pin to
    // 5V.
    var potentiometer = new five.Sensor({
      pin: "A3"
    });

    potentiometer.on("change", function() {
      console.log(this.value, this.raw);
      value.innerHTML = this.value;
    });

  });

});