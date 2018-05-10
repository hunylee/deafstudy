var PythonShell = require('python-shell');
var pyshell = new PythonShell('./pythonTest.py');

// sends a message to the Python script via stdin
pyshell.send('{ "test":"test", "a":"a"}');

pyshell.send('{ "test":"test"}');

pyshell.on('message', (msg) => {
    console.log(msg);
});

pyshell.end((err, code, signal) => {
    if (err) throw err;

    console.log('The exit code was : ', code);
    console.log('The exit signal was : ', signal);
    console.log('finished');
    console.log('finished');
})