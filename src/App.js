import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from 'react-router-dom';
 import RoutesRoot from './routes'

export default function App() {
  return (
    <Router>
      <div className="app">
        <ul className="header">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/product">product</Link>
          </li>
          <li>
            <Link to="/manage">manage</Link>
          </li>
          <li>
            <Link to="/hooks">hooks</Link>
          </li>
          <li>
            <Link to="/RouterTestPage">RouterTestPage</Link>
          </li>
        </ul>

        <div className="main">
          <Switch>
             <RoutesRoot  />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
