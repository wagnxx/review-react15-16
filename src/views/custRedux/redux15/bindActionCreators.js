// 类似vuex的 mapAction，把actions里的action取出来
function bindActionCreator(actionCrators, dispatch) {
  return function() {
    return dispatch(actionCrators.apply(this, arguments));
  };
}

export default function bindActionCreators(actionCrators, dispatch) {
  if (typeof actionCrators == 'function') {
    return bindActionCreator(actionCrators, dispatch);
  }
  if (typeof actionCrators != 'object' || actionCrators == null) {
    throw new Error('actionCreators必须是函数或数组');
  }
  // 对象
  const keys = Object.entries(actionCrators);
  const boundActionsCreators = {};
  for (let item of keys) {
    const [key, actionCrator] = item;
    if (typeof actionCrator == 'function') {
      boundActionsCreators[key] = bindActionCreator(actionCrator, dispatch);
    }
  }
  return boundActionsCreators;
}
