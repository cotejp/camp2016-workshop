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

    var led = new five.Led.RGB({
      pins: {
        red: 3,
        blue: 5,
        green: 6
      }
    });

    // Settings Panel
    var settings = QuickSettings.create(100, 100, "LED Settings")
      .addRange("intensity", 0, 100, 50, 1, function () {
        led.intensity(settings.getRangeValue("intensity"));
      })
      .addColor("color", "#FFFFFF", function () {
        led.color(settings.getColor("color"));
      })
      .addButton("toggle", function () {
        led.toggle();
      });

    // Assign initial color and intensity
    led.color(settings.getColor("color"));
    led.intensity(settings.getRangeValue("intensity"));

  });

});
