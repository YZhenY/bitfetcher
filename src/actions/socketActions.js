import types from './actionTypes';

const actionCreators = {
    socketOpen: e => ({ type: types.SOCKET_OPEN }),
    socketClose: e => ({ type: types.SOCKET_CLOSE }),
    socketError: err => ({ type: types.SOCKET_ERROR, payload: err }),
    socketMessage: e => {
        console.log(`Action creator called on message ${e.data}`);
        return ({ type: types.SOCKET_MESSAGE, payload: JSON.parse(e.data) })
    },
    socketConnect: e => {
        console.log('Connecting to socket');
        return ({ type: types.SOCKET_CONNECT })
    }
  }

export default actionCreators;