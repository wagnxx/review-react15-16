import React from 'react';
import {
    Redirect,
    Route,
  
} from 'react-router-dom';

// routes page
import ManagePage from './views/manage';
import LoginPage from './views/login';
import HomePage from './views/home';
import ProductPage from './views/product';
import HooksPage from './views/hooks';
import RouterTestPage from './views/router';
import CustReduxPage from './views/custRedux';
import SchedulePage from './views/schedule';
import ImmutablePage from './views/immutable/index';
import BasicJsPage from './views/basicjs'

export default () => (
    <>
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/hooks" component={HooksPage} />
        <Route path="/manage" component={ManagePage} />
        <Route path="/RouterTestPage" component={RouterTestPage} />
        <Route path="/CustReduxPage"  component={CustReduxPage} />
        <Route path="/SchedulePage"  component={SchedulePage}  />
        <Route path="/immutable"  component={ImmutablePage}  />
        <Route path="/basic"  component={BasicJsPage}  />
        <Redirect path="/" exact to={{ pathname: '/basic' }} />
    </>
);