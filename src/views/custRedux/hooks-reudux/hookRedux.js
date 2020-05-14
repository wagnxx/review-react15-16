import React, { createContext, useContext, useReducer } from 'react';

function hooksRedux(reducer, initState) {
  let __state = initState;
  const HookContext = createContext('default');

  let store = {
    useContext: () => useContext(HookContext),
    _state: initState,
    dispatch: undefined
  };

  const middlewareReducer = (state, action) => {
    let nextState = reducer(state, action);
    store._state = nextState;
    return nextState;
  };

  const Provider = props => {
    let [state, dispatch] = useReducer(middlewareReducer, initState);

    if (!store.dispatch) {
      store.dispatch = async action => {
        if (typeof action === 'function') {
          await action(dispatch, store._state);
        } else {
          dispatch(action);
        }
      };
    }

    return (
      <HookContext.Provider {...props} value={state}></HookContext.Provider>
    );
  };

  return {
    store,
    Provider
  };
}
