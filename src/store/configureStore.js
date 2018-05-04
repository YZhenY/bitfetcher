import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import types from '../actions/actionTypes.js';
// import thunk from 'redux-thunk';
import socketActionCreators from '../actions/socketActions.js'
import createSocketMiddleware from './socketMiddleware.js';

const mySocketURL = 'ws://localhost:5000'
const mySubscribeData = { 
    event: 'subscribe', 
    channel: 'ticker', 
    symbol: 'tBTCUSD' 
  }
const mySocketPredicate = action => action.type === types.SOCKET_CONNECT
const myEventHandlers = {
  onopen: socketActionCreators.socketOpen,
  onclose: socketActionCreators.socketClose,
  onerror: socketActionCreators.socketError,
  onmessage: socketActionCreators.socketMessage
}

const mySocketMiddleware = createSocketMiddleware(
  mySocketURL,
  mySubscribeData,
  mySocketPredicate,
  myEventHandlers
)

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(mySocketMiddleware)
  );
}