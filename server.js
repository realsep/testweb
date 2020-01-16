var express = require('express');
var bodyParser = require('body-parser');
var port = 5009;
var rp = require('request-promise');

var app = new express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res, next) {
    res.send("Online");
});

app.post('/liff', function(req, res, next) {
    var options = {
        method: 'POST',
        uri: 'https://gentle-crag-28693.herokuapp.com/test',
        json: true
    };

    rp(options)
        .then(function(parsedBody) {
            res.send(parsedBody)
        })
        .catch(function(err) {
            return next(err);
        });
});

app.listen(process.env.PORT || port, function() {
    console.log('Node start on port : ' + port);
});
