const WS = require('ws');

const symbolList = ["btcusd","ltcusd","ltcbtc","ethusd","ethbtc","etcbtc","etcusd","rrtusd","rrtbtc","zecusd","zecbtc","xmrusd","xmrbtc","dshusd","dshbtc","btceur","btcjpy","xrpusd","xrpbtc","iotusd","iotbtc","ioteth","eosusd","eosbtc","eoseth","sanusd","sanbtc","saneth","omgusd","omgbtc","omgeth","bchusd","bchbtc","bcheth","neousd","neobtc","neoeth","etpusd","etpbtc","etpeth","qtmusd","qtmbtc","qtmeth","avtusd","avtbtc","avteth","edousd","edobtc","edoeth","btgusd","btgbtc","datusd","datbtc","dateth","qshusd","qshbtc","qsheth","yywusd","yywbtc","yyweth","gntusd","gntbtc","gnteth","sntusd","sntbtc","snteth","ioteur","batusd","batbtc","bateth","mnausd","mnabtc","mnaeth","funusd","funbtc","funeth","zrxusd","zrxbtc","zrxeth","tnbusd","tnbbtc","tnbeth","spkusd","spkbtc","spketh","trxusd","trxbtc","trxeth","rcnusd","rcnbtc","rcneth","rlcusd","rlcbtc","rlceth","aidusd","aidbtc","aideth","sngusd","sngbtc","sngeth","repusd","repbtc","repeth","elfusd","elfbtc","elfeth","btcgbp","etheur","ethjpy","ethgbp","neoeur","neojpy","neogbp","eoseur","eosjpy","eosgbp","iotjpy","iotgbp","iosusd","iosbtc","ioseth","aiousd","aiobtc","aioeth","requsd","reqbtc","reqeth","rdnusd","rdnbtc","rdneth","lrcusd","lrcbtc","lrceth","waxusd","waxbtc","waxeth","daiusd","daibtc","daieth","cfiusd","cfibtc","cfieth","agiusd","agibtc","agieth","bftusd","bftbtc","bfteth","mtnusd","mtnbtc","mtneth","odeusd","odebtc","odeeth","antusd","antbtc","anteth","dthusd","dthbtc","dtheth","mitusd","mitbtc","miteth","stjusd","stjbtc","stjeth","xlmusd","xlmeur","xlmjpy","xlmgbp","xlmbtc","xlmeth","xvgusd","xvgeur","xvgjpy","xvggbp","xvgbtc","xvgeth","bciusd","bcibtc"];
const serverCheck = 'https://api.bitfinex.com/v2/platform/status';


const w = new WS('wss://api.bitfinex.com/ws/2')

w.on('message', (msg) => console.log(msg))

let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tBTCUSD' 
})

w.on('open', () => w.send(msg))

module.exports = {
    
}