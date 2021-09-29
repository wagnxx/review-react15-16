import React from 'react';
import {
    Redirect,
    Route,
  
} from 'react-router-dom';


import ImmutablePage from './views/immutable/index';

export default () => (
    <>
        <Route path="/immutable"  component={ImmutablePage}  />
        <Redirect path="/" exact to={{ pathname: '/immutable' }} />
    </>
);