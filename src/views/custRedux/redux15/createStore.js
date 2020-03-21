import { render } from '@testing-library/react';

/**
 *
 * @param {*} rootReducer
 * @param {*} initState
 * @param {*} middleware
 * 回顾 函数式
 * 1. 范畴论，抽象世界对象和对象之间的关系，rdux吧事件抽象成action
 * container -->store
 * __value=>currentState
 * f =>action
 * map=>reducer
 * IO函子=》middleware
 *
 * 2. 文件分析
 * applyMiddleware ,redux管理中间件
 * bindActionCreators,能让我们直接调用action
 * combineReducers,合并reducer
 * compose，组合函数，curry化
 * createStore 创建store容器
 *
 */

/**
 *
 * @param {any} initState
 *
 * 第一版
 */
// function createStore(initState) {
//   let state = initState,
//     listeners = [],
//     getState = () => state,
//     subscribe = listener => listeners.push(listener),
//     changeState = newState => {
//       state = newState;
//       listeners.forEach(l => l());
//     };

//   return {
//     getState,
//     subscribe,
//     changeState
//   };
// }

// 第二版
// function createStore(reducer,initState) {
//     let state = initState,
//       listeners = [],
//       getState = () => state,
//       subscribe = listener => listeners.push(listener),
//       dispacth = (action) => {
//         state = reducer(state,action);
//         listeners.forEach(l => l());
//       };

//     return {
//       getState,
//       subscribe,
//       dispacth
//     };
//   }

// 第三版
function createStore(reducer, initState, rewriteCreateStore) {
  if (rewriteCreateStore) {
    // rewriteCreateStore=createStore;
    const newCreateStore = rewriteCreateStore(createStore);
    return newCreateStore(render, initState);
  }

  let state = initState,
    listeners = [],
    getState = () => state,
    subscribe = listener => listeners.push(listener),
    dispacth = action => {
      state = reducer(state, action);
      listeners.forEach(l => l());
    },
    replaceReducer = nextReducer => {
      reducer = nextReducer;
      dispacth();
    };

  dispacth({ type: Symbol() });
  return {
    getState,
    subscribe,
    dispacth,
    replaceReducer
  };
}

export default createStore;
