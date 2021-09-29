import { combineReducers } from 'redux-immutable';
// import { reducer as headerReducer } from '../common/header/store';
import { reducer as immutableReducer } from '../views/immutable/store';
// import { reducer as detailReducer } from '../pages/detail/store';
// import { reducer as loginReducer } from '../pages/login/store';

const reducer = combineReducers({
    // header: headerReducer, //对应的state保存在 header下

    immutable:immutableReducer
});

export default reducer;