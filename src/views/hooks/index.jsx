import React from 'react'



import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from 'react-router-dom';

import UseStateDemo from './demos/useState.demo'
import MemoDemo from './demos/memo.demo'
import ContextDemo from './demos/context.demo'
import RefDemo from './demos/ref.demo'


const B = () => <div>B Component</div>;


export default () => {
    return <div>hooks page
            <Router>
            <ul>

                <li><Link to='/hooks/useState'>useState</Link></li>
                <li><Link to='/hooks/MemoDemo'>MemoDemo</Link></li>
                <li><Link to='/hooks/ContextDemo'>ContextDemo</Link></li>
                <li><Link to='/hooks/RefDemo'>RefDemo</Link></li>
            </ul>
            <hr/>
            <div>

                <Switch>
                    <Route path='/hooks/useState' component={UseStateDemo} />
                    <Route path='/hooks/MemoDemo' component={MemoDemo} />
                    <Route path='/hooks/ContextDemo' component={ContextDemo} />
                    <Route path='/hooks/RefDemo' component={RefDemo} />
                    <Redirect path="/hooks" exact to={{ pathname: '/hooks/a' }} />
                </Switch>
            </div>
        </Router>
    </div>
}