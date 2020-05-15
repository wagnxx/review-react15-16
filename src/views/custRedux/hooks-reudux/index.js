import React, { useReducer, useContext, createContext } from 'react';

//中间件 日志中间件
function middleWareLog(store, lastState, nextState, action) {
  console.log(action.type);
  console.log('last', lastState);
  console.log('nextState', nextState);
}

function reducerInAction(state, action) {
  if (typeof action.reducer === 'function') {
    return action.reducer(state);
  }
  return state;
}

export default function createStore(parmas) {
  const Appcontext = createContext();
  const { initState, reducer, middleware } = {
    reducer: reducerInAction,
    middleware: [middleWareLog],
    ...parmas
  };

  const middleWareReducer = (lastState, action) => {
    // switch (action.type) {
    //   case 'init':
    //     return {
    //       ...lastState,
    //       age: lastState.age+1
    //     };
    //   default:
    //     return {
    //       ...lastState
    //     };
    // }
    let nextState = reducer(lastState, action);
    if (!Array.isArray(middleware)) {
      throw new Error('middleware type must be array');
    }

    for (let item of middleware) {
      const newState = item(store, lastState, nextState, action);
      if (newState) {
        nextState = newState;
      }
    }

    // 实现reducer in action

    store._state = nextState;
    return nextState;
  };

  const store = {
    _state: initState,
    dispatch: undefined,
    useContext: () => {
      return useContext(Appcontext);
    }
  };
  const Provider = props => {
    const [state, dispatch] = useReducer(middleWareReducer, initState);
    if (!store.dispatch) {
      store.dispatch = async action => {
        if (typeof action === 'function') {
          await action(dispatch, store._state);
        } else {
          dispatch(action);
        }
      };
    }

    return <Appcontext.Provider {...props} value={{ ...state }} />;
  };

  return { Provider, store };
}
