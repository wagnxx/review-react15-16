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

export default () => (
    <>
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/hooks" component={HooksPage} />
        <Route path="/manage" component={ManagePage} />
        <Route path="/RouterTestPage" component={RouterTestPage} />
        <Route path="/CustReduxPage"  component={CustReduxPage} />
        <Redirect path="/" exact to={{ pathname: '/RouterTestPage' }} />
    </>
);