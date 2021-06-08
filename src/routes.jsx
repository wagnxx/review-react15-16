import React from 'react';
import {
    Redirect,
    Route,
    useLocation,

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

const RequireAuthentication = ({ PendingComponent, path, children, ...rest }) => {

    const location = useLocation();

    if (location.pathname === path)
        return <Route path={path} {...rest} render={() => <PendingComponent />} />

    return null;
}

export default (props) => {
    return (
        <>
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <RequireAuthentication path="/product" PendingComponent={ProductPage} {...props} />
            <Route path="/hooks" component={HooksPage} />
            <Route path="/manage" component={ManagePage} />
            <Route path="/RouterTestPage" component={RouterTestPage} />
            <Route path="/CustReduxPage" component={CustReduxPage} />
            <Route path="/SchedulePage" component={SchedulePage} />
            <Route path="/immutable" component={ImmutablePage} />
            <Route path="/basic" component={BasicJsPage} />

            <Redirect path="/" to={{ pathname: '/basic' }} />
        </>
    )
}