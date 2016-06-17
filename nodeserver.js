"use strict";
var restify = require("restify");
var server = restify.createServer({
  name: 'VattuMittari',
  version: '1.0.0'
});

function addZero(i) { // adds leading zero to timestamp to get double digit figure
if (i < 10) {
      i = "0" + i;
    }
    return i;
}

// REST API implementation for handling the push messages from the Raspberry Pi
server.post('/sendMeasurements', function (req, res, next) {
    var time = new Date();
    var hh = addZero(time.getHours());
    var mm = addZero(time.getMinutes());
    var ss = addZero(time.getSeconds());
    var consoleTime = hh + ":" + mm + ":" + ss; 
    
    console.log('got temperature reading from RasPi. Timestamp ' + consoleTime); // remove this
    handleSenses(req.params[0].senses, time);

    res.send(Number(200)); // send reply
    next();
});

server.listen(8080, function () {
    console.log('Node.js RasPi %s', server.url);
});
