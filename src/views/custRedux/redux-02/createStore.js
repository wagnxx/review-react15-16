const createStore=(reducer,initState,applyMiddleware)=>{
    if(typeof applyMiddleware ==='function'){
        return applyMiddleware(createStore)(reducer,initState)
    }
    let state =initState;

    let listeners=[];

    let subscribe=l=>listeners.push(l);

    let getState=()=>state;

    let dispatch = (action)=>{
        state=reducer(state,action);
        listeners.forEach(l=>l());
    }

    dispatch({ type: Symbol() });
    return {
        getState,
        subscribe,
        dispatch
    }
};

export default createStore;