function bindActionCreator(actionCreator, dispatch) {
  return () => {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('actionCreator type error,must be function or object');
  }

  let boundActions = {};

  let entries = Object.entries(actionCreators);

  for (let item of entries) {
    let [key, actionCreator] = item;

    if (typeof actionCreator === 'function') {
      boundActions[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActions;
}

export default bindActionCreators;
