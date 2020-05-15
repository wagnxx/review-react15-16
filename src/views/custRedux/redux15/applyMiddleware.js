import compose from './compose';
const applyMiddleware = function(...middlewares) {
  return function(oldCreateStore) {
    return function newCreateStore(...args) {
      //1. 调用整个中间件
      const store = oldCreateStore(args);
      //2. 形成一个chain，目的还是中间件依次执行
      //   let dispatch = store.dispatch;
      const chain = middlewares.map(middleware => middlewares(store));
      // eslint-disable-next-line array-callback-return
      //   chain.reverse().map(mw => {
      //     dispatch = mw(dispatch);
      //   });
      //   store.dispatch = dispatch;
      const dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch
      };
    };
  };
};

export default applyMiddleware;
