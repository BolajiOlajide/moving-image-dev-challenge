import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/home';

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;