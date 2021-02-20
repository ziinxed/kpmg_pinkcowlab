const { PythonShell } = require("python-shell");

let options = {
  pythonPath: "C:\\Users\\dudgk\\AppData\\Local\\Programs\\Python\\Python38-32\\python.exe",
  scriptPath: "../core",
};

function launchPyshell(data, socket) {
  let pyshell = new PythonShell("opencv_test_webcam_web.py", options);

  // sends a message to the Python script via stdin
  pyshell.send(data);

  pyshell.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    ////console.log(message);
    var isData = message.indexOf("data");
    ////console.log("isdata : ", isData);
    if (isData != -1) {
      socket.emit("src", message);
    }
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    //console.log("The exit code was: " + code);
    //console.log("The exit signal was: " + signal);
    //console.log("finished");
  });
}

// options.args[0] = data;
// PythonShell.run("opencv_test_webcam_web.py", options, function (err, result) {
//   if (err) throw err;
//   ////console.log(result);
//   socket.emit("src", result[0]);
//   socket.emit("warn", result[1]);
// });

module.exports = { launchPyshell };
