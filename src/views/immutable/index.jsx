import React from 'react';


import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from 'react-router-dom';

//drop sun components list 
import ApiPage from './ApiPage';
import PracticePage from './PracticePage';


import { Provider } from 'react-redux';
import createStore from '../../store';
const store = createStore();
export default () => {
    return (
        <Provider store={store}>

            <Router>
                <ul>

                    <li><Link to='/immutable/api'>api</Link></li>
                    <li><Link to='/immutable/practice'>practice</Link></li>
                </ul>
                <hr />

                <Switch>
                    <Route path='/immutable/api' component={ApiPage} />
                    <Route path='/immutable/practice' component={PracticePage} />
                    <Redirect path="/immutable" exact to={{ pathname: '/immutable/practice' }} />
                </Switch>

            </Router>
        </Provider>

    )
}