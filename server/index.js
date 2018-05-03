const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const BFX = require('bitfinex-api-node');

const app = express();
const WS_URL = 'https://api.bitfinex.com/ws/2';
// const WS_URL = 'http://echo.websocket.org';

var port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// var wsProxy = proxy('/', {target:WS_URL, ws:true});
var wsProxy = proxy('/', {
    target: WS_URL,
    // pathRewrite: {
    //  '^/websocket' : '/socket',        // rewrite path.
    //  '^/removepath' : ''               // remove path.
    // },
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    ws: true, // enable websocket proxy
    logLevel: 'debug',

  })

// var wsProxy = proxy(WS_URL)

app.use(wsProxy);
// const bfx = new BFX({
//   ws: {
//     autoReconnect: false,
//     seqAudit: true,
//     packetWDDelay: 10 * 1000
//   }
// })

// var ws = bfx.ws(2);
// ws.on('error', (err) => console.log(err))
// ws.on('open', () => {
//     console.log(ws.subscribeTrades('BTCUSD'));
//     console.log(ws.subscribeTicker('tBTCUSD'));
//     console.log('Websocket open');
//     ws.onTicker({ symbol: 'tBTCUSD' }, (ticker, a, b, c) => {
//         console.log(ticker, a, b, c);
//     //     if (Array.isArray(trade[0])) {
//     //         console.log(`recv snapshot of ${trade.length} trades`)
//     // } else {
//     //   console.log(`trade: ${JSON.stringify(trade)}`)
//     // }
//   })

// //   ws.onTrades({ symbol: 'tBTCUSD' }, (trade) => {
// //     console.log(arguments);
// // //     if (Array.isArray(trade[0])) {
// // //         console.log(`recv snapshot of ${trade.length} trades`)
// // // } else {
// // //   console.log(`trade: ${JSON.stringify(trade)}`)
// // // }
// // })
// })
// ws.open();

// const ws = require('ws')
// const w = new ws('wss://api.bitfinex.com/ws/2')

// w.on('message', (msg) => console.log(msg))

// let msg = JSON.stringify({ 
//   event: 'subscribe', 
//   channel: 'ticker', 
//   symbol: 'tBTCUSD' 
// })

// w.on('open', () => w.send(msg))


var server = app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on ${port}`)
    }
});

server.on('upgrade', wsProxy.upgrade);