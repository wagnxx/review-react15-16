import * as React from 'react';
import Routes from '../routes';
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  return <Router basename="/">{Routes()}</Router>;
};

export default App;
