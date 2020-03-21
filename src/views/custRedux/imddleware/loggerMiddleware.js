const loggerMiddleware = store => next => action => {

    console.log('this state',store.getState());
    console.log('action',action);
    next(action);
    console.log('next store',store.getState());




};

export default loggerMiddleware;
