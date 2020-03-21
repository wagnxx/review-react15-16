const combineReducer = reducers => {
  let keys = Object.keys(reducers);

  return (state, action) => {
    let finalState = {};

    for (let k of keys) {
      let reducer = reducers(k);
      let prevStateForKey = state[k]||state||{};
      let nextStateForkey = reducer(prevStateForKey, action);

      finalState[k] = nextStateForkey;
    }

    return finalState;
  };
};

export default combineReducer;