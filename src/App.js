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
            <Link to="/immutable">immutable</Link>
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
