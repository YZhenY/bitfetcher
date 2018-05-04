import types from './actionTypes';

const actionCreators = {
    socketOpen: e => ({ type: types.SOCKET_OPEN }),
    socketClose: e => ({ type: types.SOCKET_CLOSE }),
    socketError: err => ({ type: types.SOCKET_ERROR, payload: err }),
    socketMessage: e => ({ type: types.SOCKET_MESSAGE, payload: JSON.parse(e.data) }),
    socketConnect: e => ({ type: types.SOCKET_CONNECT })
  }

export default actionCreators;