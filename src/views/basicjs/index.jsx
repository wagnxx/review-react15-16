import React from 'react'



import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from 'react-router-dom';

import IndexDBPage from './demos/indexDB/indexDB'

import './index.css'
 

export default () => {
    return <div className='sub-page'>
        <h2  className='sub-page__header' >indexDB page</h2>
    
        <Router>
            <ul className='sub-page__nav'>

                <li><Link to='/basic/indexDB'>indexDB</Link></li>
 
            </ul>
        
            <div className='sub-page__main' style={{ padding: '10px', marginTop: '10px', border: '1px solid #ddd' }}>

                <Switch>
                    <Route path='/basic/indexDB' component={IndexDBPage} />
                 
                    <Redirect path="/basic" exact to={{ pathname: '/basic/indexDB' }} />
                </Switch>
            </div>
        </Router>
    </div>
}