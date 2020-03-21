import React from 'react';

import { createStore, combineReducers, applyMiddleware, bindActionCreators } from './redux15'
import infoReducer from './reducers/infoReducer'
import counterReducer from './reducers/counterReducer'
import loggerMiddleware from './imddleware/loggerMiddleware'
import timeMiddleware from './imddleware/timeMiddleware'



const reducer = combineReducers({ infoReducer, counterReducer });
// const initState = {
//     counter: {
//         count: 0
//     },
//     info: {
//         name: '',
//         description: ''
//     }


// }

// 第一版
// let store = createStore(initState);

// store.subscribe(() => {
//     let satte = store.getState();
//     console.log('当前的state', state);
// });

// store.changeState({
//     ...store.getState(),
//     info: {
//         name: 'hello',
//         description: 'redux design class'
//     }
// }));


// 第二版
let store = createStore(reducer, {}, applyMiddleware(loggerMiddleware, timeMiddleware));;
// let log=loggerMiddleware(store);
// let time=timeMiddleware(store);
// let next=store.dispacth;
// store.dispacth=time(log(next));

store.subscribe(() => {
    let state = store.getState();
    console.log('当前的state', state);
});
store.dispacth({
    type: 'INCREMENT'
})
// store.changeState({
//     ...store.getState(),
//     info: {
//         name: 'hello',
//         description: 'redux design class'
//     }
// });



function increment() {

}

const actionsProps = dispatch => (

    {
        'increment': bindActionCreators(increment, dispatch)
    }
);






export default () => <div>redux page computed</div>
