import types from './actionTypes';
import { isArray } from 'util';

const actionCreators = {
    socketOpen: e => ({ type: types.SOCKET_OPEN }),
    socketClose: e => ({ type: types.SOCKET_CLOSE }),
    socketError: err => ({ type: types.SOCKET_ERROR, payload: err }),
    socketMessage: e => {
        var parsedData = JSON.parse(e.data);
        // console.log(`Action creator called on message ${e.data}`);
        if (parsedData.event === "subscribed" ) {
            console.log('subscribed message ', parsedData);
            return ({ type: types.SOCKET_SUBSCRIBED, 
            pairMapping: parsedData,
         })
       } else {
           return ({ type: types.SOCKET_MESSAGE, payload: parsedData })
       }
    },
    socketConnect: e => {
        // console.log('Connecting to socket');
        return ({ type: types.SOCKET_CONNECT, 
            subscribeData: e.subscribeData,
         })
    },
    socketSend: e => {
        console.log('Connecting to socket');
        return ({ type: types.SOCKET_SEND, 
            subscribeData: e.subscribeData,
         })
    },
  }

export default actionCreators;