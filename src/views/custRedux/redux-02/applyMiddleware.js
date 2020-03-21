const applyMiddleware = (...middwares) => store => createStore => (...args) => {
  const store = createStore(...args);

  const chain = middwares.map(mv => mv(store));

  let dispatch = chain.reverse().reduce((a, b) => (...a) => a(b(a)))(
    store.dispatch
  );

  return {
    ...store,
    dispatch
  };
};
