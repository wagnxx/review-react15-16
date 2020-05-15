const timeMiddleware = store => next => action => {
  console.log('time middleware', Date.now());
  next(action);
};

export default timeMiddleware;
