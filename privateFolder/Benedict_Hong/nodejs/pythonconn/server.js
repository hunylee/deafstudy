var express = require('express');
var pythonShell = require('python-shell');
var app = express();

app.listen(3000, function() {
    console.log('server running on port 3000');
});

app.get('/pythonconn', callFunc);

function callFunc(req, res) {
    var options = {
        args: []
    }

    pythonShell.run('./python/test.py', options, function(err, data) {
        if(err) res.send(err);
        res.send(data.toString());
    });
}