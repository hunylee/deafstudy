var express = require('express')

var PythonShell = require('python-shell')
var options = {
    scriptPath: './python',
    mode: 'json'
}
var pyshell = new PythonShell('hello.py', options)

function onMessage(msg) {
    console.log('onMessage : ', msg);
}

function end(err) {
    if (err) console.log(err);
}

var app = express()

app.listen(3000, () => {
    console.log('server running on port 3000')
});

app.get('/name', callName)
app.get('/start', startFunc)

function startFunc(req, res) {
    pysheel.send('start')
}

function callName(req, res) {
    var req = {
        firstName: req.query.firstname,
        lastName: req.query.lastname
    }
    console.log(req);
    pyshell.send(JSON.stringify(req))
    pyshell.on('message', onMessage)
}