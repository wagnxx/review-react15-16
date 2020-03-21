const initState = {
    info: {
        name: '',
        description: ''
    }


}

export default (state, action) => {
    if(!state){
        state=initState
    }
    switch (action.type) {
      case 'SET_NAEM':
        return {
          ...state,
          name: action.name
        };
  
      case 'SET_DESCRIPTION':
        return {
          ...state,
          description: action.description
        };
  
      default:
        return state;
    }
  };
  