import types from './actionTypes';

export function update_ticker(json) {
    return {type: types.UPDATE_TICKER, stuff: json.data};
  }

export function handleUpdateTicker () {
    return dispatch => {
      return fetch(url(), {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveStuff(json)));
    };
  }

  export const init = ( store ) => {
    Object.keys( messageTypes )
      .forEach( type => socket.on( type, ( payload ) => 
         store.dispatch({ type, payload }) 
      )
    );
  };