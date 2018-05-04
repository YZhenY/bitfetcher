const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const BFX = require('bitfinex-api-node');

const app = express();
const WS_URL = 'https://api.bitfinex.com/ws/2';

var port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var wsProxy = proxy('/', {
    target: WS_URL,
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    ws: true, // enable websocket proxy
    logLevel: 'debug',
  })

app.use(wsProxy);


var server = app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on ${port}`)
    }
});

server.on('upgrade', wsProxy.upgrade);