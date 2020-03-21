export default reducers => {
  //combineReducers

  let reducerKeys = Object.keys(reducers);

  //combine
  return (state = {}, action) => {
    //遍历reducers
    let nextState = {};
    for (let item of reducerKeys) {
      const reducer = reducers[item];
      let previousStateForKey = state[item];
      let nextStateForKey = reducer(previousStateForKey,action);
      nextState[item]= nextStateForKey;
    }
    return nextState;
  };
};
