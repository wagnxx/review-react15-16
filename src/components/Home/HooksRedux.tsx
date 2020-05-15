import * as React from 'react';
const { useReducer, createContext, useContext } = React;
// 核心一定要返回状态出去
function reducerInAction(state, action) {
  if (typeof action.reducer === 'function') {
    return action.reducer(state);
  }
  return state;
}
export default function HooksRedux(params) {
  const { initialState = {}, reducer } = {
    ...params,
    reducer: reducerInAction,
  };
  //实际　ｃｒｅａｔｅｃｏｎｔｅｘｔ管理所有状态版本管理
  const AppContext = createContext();
  const middleWareReducer = (lastState, action) => {
    let nextState = reducer(lastState, action);
    store._state = nextState;
    return nextState;
  };
  const store = {
    _state: initialState,
    dispatch: undefined,
    getState() {
      return store._state;
    },
    useContext: () => {
      return useContext(AppContext);
    },
  };

  const Provider = (props) => {
    const [state, dispatch] = useReducer(middleWareReducer, initialState);
    if (!store.dispatch) {
      store.dispatch = async (action) => {
        if (typeof action == 'function') {
          await action(dispatch, store.getState());
        } else {
          dispatch(action);
        }
      };
    }
    return <AppContext.Provider {...props} value={state} />;
  };

  return {
    Provider,
    store,
  };
}
