import { bindActionCreators } from 'redux'
import types from '../actions/actionTypes.js';
import socketActionCreators from '../actions/socketActions.js'

var ws;

const createSocketMiddleware = (
  socketURL, // the url our socket connects to
  shouldInstantiate, // a predicate function to know when to connect our socket
  eventHandlers // the actions we want our socket to dispatch
) => store => next => action => {
  if (shouldInstantiate(action)) {
    // instantiate the web socket
    ws = new window.WebSocket(socketURL)
    console.log('Middleware connection called');
    // bind eventHandlers to dispatch
    const boundEventHandlers = bindActionCreators(eventHandlers, store.dispatch)
    // fire onopen event, and fire off a subscribe message with our handshake data
    ws.onopen = e => {
      boundEventHandlers.onopen(e)
      action.subscribeData.map(data => {
        ws.send(JSON.stringify({ type: 'subscribe', ...data }))
      })
    }
    // assign remaining event handlers
    ws.onclose = boundEventHandlers.onclose
    ws.onerror = boundEventHandlers.onerror
    ws.onmessage = boundEventHandlers.onmessage
  
  } else if (action.type === types.SOCKET_SEND) {
    action.subscribeData.map(data => {
      console.log('sending data', JSON.stringify({ type: 'subscribe', ...data }))
      ws.send(JSON.stringify({ type: 'subscribe', ...data }))
    })
    next(action);
  } else if (action.type === types.SOCKET_MESSAGE) {
    //formats messages based on previous state
    var state = store.getState();
    var isTrades = false;
    Object.keys(state.subscribedMapping.trades).map(chanId => {
      if (chanId == action.payload[0]) {
        isTrades = true;
      }
    })

    if (isTrades && (action.payload[1] ===  "te" || action.payload[1] === "tu")) {
      action.payload[1] = [action.payload[2]].concat(state.tickers[action.payload[0]]);
      action.payload[1].pop();
    }
    next(action);
  } else if (action.type === types.SOCKET_CLOSE) {
    // cater for disconnects
    var currentSubscriptions = [];
    var state = store.getState();
    Object.keys(state.subscribedMapping).map(key => {
      Object.keys(state.subscribedMapping[key]).map(chanId => {
        currentSubscriptions.push({
          event:"subscribe",
          channel:key,
          symbol: `t${state.subscribedMapping[key][chanId]}`,
        })
      }) 
    })
    // bind eventHandlers to dispatch
    const boundEventHandlers = bindActionCreators(eventHandlers, store.dispatch)

    console.log('New Connection called with ', currentSubscriptions);
    action.connectCB = boundEventHandlers.connect({subscribeData:currentSubscriptions});
    next(action)
  } else if (action.type === types.BUTTON_CLOSE) {
    console.log('WS Closed Clicked');
    ws.close();
  }
  else {
    return next(action)
  }
}

const mySocketURL = 'ws://localhost:5000'
const mySocketPredicate = action => action.type === types.SOCKET_CONNECT
const myEventHandlers = {
  onopen: socketActionCreators.socketOpen,
  onclose: socketActionCreators.socketClose,
  onerror: socketActionCreators.socketError,
  onmessage: socketActionCreators.socketMessage,
  connect: socketActionCreators.socketConnect
}

const socketMiddleware = createSocketMiddleware(
  mySocketURL,
  mySocketPredicate,
  myEventHandlers
)

export default socketMiddleware;