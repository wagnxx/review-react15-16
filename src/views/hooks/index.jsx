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
import SuspenseAndLazyDemo from './demos/suspens-demo-simple'
import {ClassComp} from './demos/classComp'
import './hook.css'
 

export default () => {
    return <div className='hook-page'>
        <h2  className='hook-page__header' >hooks page</h2>
    
        <Router>
            <ul className='hook-page__nav'>

                <li><Link to='/hooks/useState'>useState</Link></li>
                <li><Link to='/hooks/MemoDemo'>MemoDemo</Link></li>
                <li><Link to='/hooks/ContextDemo'>ContextDemo</Link></li>
                <li><Link to='/hooks/RefDemo'>RefDemo</Link></li>
                <li><Link to='/hooks/suspense'>SuspenseAndLazyDemo</Link></li>
                <li><Link to='/hooks/ClassComp'>ClassComp</Link></li>
            </ul>
        
            <div className='hook-page__main' style={{ padding: '10px', marginTop: '10px', border: '1px solid #ddd' }}>

                <Switch>
                    <Route path='/hooks/useState' component={UseStateDemo} />
                    <Route path='/hooks/MemoDemo' component={MemoDemo} />
                    <Route path='/hooks/ContextDemo' component={ContextDemo} />
                    <Route path='/hooks/RefDemo' component={RefDemo} />
                    <Route path='/hooks/suspense' component={SuspenseAndLazyDemo} />
                    <Route path='/hooks/ClassComp' component={ClassComp} />
                    <Redirect path="/hooks" exact to={{ pathname: '/hooks/ClassComp' }} />
                </Switch>
            </div>
        </Router>
    </div>
}