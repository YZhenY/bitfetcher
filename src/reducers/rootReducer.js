import {combineReducers} from 'redux';
import { channel } from 'redux-saga';

function tickers(state = {}, action) {
    switch (action.type) {
      case 'SOCKET_MESSAGE':
        console.log('Message reducer called')
        return action.payload
      default:
        return state
    }
  }

function subscribedMapping(state = {ticker:{}}, action) {
    switch (action.type) {
        case 'SOCKET_SUBSCRIBED':
            console.log('Subscribed mapping is called')
            // {"event":"subscribed","channel":"ticker","chanId":135,"symbol":"tBTCUSD","pair":"BTCUSD"}
            var newStateChannel = { ...state[action.pairMapping.channel] }
            newStateChannel[action.pairMapping.chanId] = action.pairMapping.pair;
            var newState = {...state};
            newState[action.pairMapping.channel] = newStateChannel;
            return newState;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    tickers,
    subscribedMapping
});

export default rootReducer;