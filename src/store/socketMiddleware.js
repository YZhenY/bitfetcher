import { bindActionCreators } from 'redux'
import types from '../actions/actionTypes.js';
import socketActionCreators from '../actions/socketActions.js'

const createSocketMiddleware = (
  socketURL, // the url our socket connects to
  shouldInstantiate, // a predicate function to know when to connect our socket
  eventHandlers // the actions we want our socket to dispatch
) => store => next => action => {
  if (shouldInstantiate(action)) {
    // instantiate the web socket
    const ws = new window.WebSocket(socketURL)
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

  
  // } else if (action.type === types.SOCKET_SEND) {
  //   ws.send(JSON.stringify({ type: 'subscribe', ...action.subscribeData }));
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
  onmessage: socketActionCreators.socketMessage
}

const socketMiddleware = createSocketMiddleware(
  mySocketURL,
  mySocketPredicate,
  myEventHandlers
)

export default socketMiddleware;