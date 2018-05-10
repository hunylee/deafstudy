// spawn_python.js
var util = require("util");

var spawn = require("child_process").spawn;
var process = spawn('python', ["python_launchd_from_nodejs.py"]);

util.log('readingin')

process.stdout.on('data', (chunk) => {

    var textChunk = chunk.toString('utf8');// buffer to string

    util.log(textChunk);
});