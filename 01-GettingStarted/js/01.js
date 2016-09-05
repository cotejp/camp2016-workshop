// Use NW.js API (http://docs.nwjs.io/en/)
nw.Window.get().showDevTools();


// Use Node.js APIs (https://nodejs.org/dist/latest-v6.x/docs/api/)
var os = nw.require("os");
console.log("OS: " + os.type());


// Use front-end libraries together with Node.js code (https://jquery.com/)
 $(document).ready(function() {
  $("body")
    // .append("<p>Hostname: " + os.hostname() + "</p>")
    // .append("<p>Home Directory: " + os.homedir() + "</p>");
    .append(`<p>Hostname: ${os.hostname()}</p>`)
    .append(`<p>Home Directory: ${os.homedir()}</p>`);
 });


// Use Chrome Platform APIs (https://developer.chrome.com/apps/api_index)
chrome.tts.speak('CAMP Festival is awesome!', {'lang': 'en-CA', 'rate': 0.8});
