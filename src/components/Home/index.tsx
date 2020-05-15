// 函数组件　＋　ｈｏｏｋｓ
import * as React from 'react';
import HooksRedux from './HooksRedux';
const { Provider, store } = HooksRedux({
  initialState: {
    name: 'jcsck',
    age: 2,
  },
});
const Home = () => {
    const state = store.useContext();
  return <div>
      <Button></Button>
  </div>;
};
// function actionOfAdd() {
//     return {
//         type:'init'
//     }
// }
function timeoutAdd(a){
    return new Promise(cb=>setTimeout(() => cb(a+1), 500);)
}

const actionAsyncOfAdd = () => async (dispatch,ownState) =>{
    const age = await timeoutAdd(ownState.age);
    dispatch ({
        type:'addCount',
        reducer(state){
            return {
                ...state,
                age,
            }
        }
    })
}
const Button = () => {
const actionOfAdd = () => async (dispatch,ownState) =>{
     return ({
        type:'addCount',
        reducer(state){
            return {
                ...state,
                age:state.age+1
            }
        }
    })
}
const Button = () => {
  function handleAdd() {
    store.dispatch( actionAsyncOfAdd);
  }
  return <button onClick={handleAdd}>button</button>;
};

const WrapHome = () => {

  return (
    <Provider>
      <hr />
      <Home></Home>
    </Provider>
  );
};

export default Home;
