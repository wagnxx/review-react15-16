import Immutable from 'immutable';

var arr = [];
arr.push({ id: 1, name: 'first', count: 2 });
arr.push({ id: 2, name: 'second', count: 1 });
arr.push({ id: 3, name: 'third', count: 2 });
arr.push({ id: 4, name: 'fourth', count: 1 });

var obj = { times: 1 };

const defaultData = Immutable.fromJS({
  list: arr,
  map: obj
});

export const reducer = (state = defaultData, action) => {
  switch (action.type) {
    case actionsTypes.LIST_ADD:
      return state.update('list', (list) => {
        const id = list.size + 1;
        return list.push({ id: 4, name: id, count: id });
      });

    case actionsTypes.MAP_ADD:
      return state.update('map', (map) => map.update('times', (v) => v + 1));

    default:
      return state;
  }
};

let timer = null;

export const actions = {
  fetchAdd: () => (dispatch) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      return dispatch({ type: actionsTypes.MAP_ADD });
    }, 1000);
  },
  fetchListAdd: () => (dispatch) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      return dispatch({ type: actionsTypes.LIST_ADD });
    }, 1000);
  },
};

export const actionsTypes = {
  LIST_ADD: 'LIST_ADD',
  MAP_ADD: 'MAP_ADD'
};
