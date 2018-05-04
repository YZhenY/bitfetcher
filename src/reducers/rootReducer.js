import {combineReducers} from 'redux';
import { channel } from 'redux-saga';

function tickers(state = {}, action) {
    switch (action.type) {
      case 'SOCKET_MESSAGE':
        // console.log('Message reducer called')
        var newState = {...state};
        if (action.payload[1] !== "hb") {
            newState[action.payload[0]] = action.payload[1];
        }
        return newState;
      default:
        return state
    }
  }

function subscribedMapping(state = {ticker:{}, trades:{}}, action) {
    switch (action.type) {
        case 'SOCKET_SUBSCRIBED':
            // console.log('Subscribed mapping is called')
            // {"event":"subscribed","channel":"ticker","chanId":135,"symbol":"tBTCUSD","pair":"BTCUSD"}
            //check for and delete old mappings
            Object.keys(state[action.pairMapping.channel]).map(chanId => {
                if (state[action.pairMapping.channel].chanId === action.pairMapping.pair) {
                    state[action.pairMapping.channel].chanId = undefined;
                }
            })

            //add new chanID to pair mapping
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