const initState = {
  counter: {
    count: 0
  }
};

export default (state, action) => {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };

    default:
      return state;
  }
};
