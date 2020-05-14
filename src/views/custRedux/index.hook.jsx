
import React from 'react'
import hookRedux from './hooks-reudux';

const { Provider, store } = hookRedux({
    initState: {
        name: 'initname',
        age: 4
    }
})
// function timeoutAdd(a){
//     return new Promise(resove=>{
//         setTimeout(() => {
//             resove(a+1)
//         }, 2000);
//     })
// }

// // 异步
// function actionAdd() {
//     // reducer in action

//     return async (dispatch, ownState) => {
//         const age = await timeoutAdd(ownState.age);
//         dispatch({
//             type: 'asyncAdd',
//             reducer(state) {
//                 return {
//                     ...state,
//                     age
//                 }
//             }
//         });
//     }

// }

//同步action

function actionAdd() {
    // reducer in action
    return {
        type: 'init',
        reducer(state) {
            return {
                ...state,
                age: state.age + 1,
            }
        }
    }
}

function Button(props) {

    function handleAdd() {
        return store.dispatch(actionAdd())
    }

    return <button onClick={handleAdd}>点击</button>
}


function Page(props) {
    const state = props.store.useContext();
    return (
        <div>
            {state.age}
            <hr />
            <Button />
        </div>
    );
}

export default () => {

    return (
        <Provider>
            <Page store={store}/>
        </Provider>);


}