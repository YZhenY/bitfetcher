import {combineReducers} from 'redux';

function tickers(state = [], action) {
    switch (action.type) {
      case 'SOCKET_MESSAGE':
        return action.payload
      default:
        return state
    }
  }

const rootReducer = combineReducers({
    tickers
});

export default rootReducer;