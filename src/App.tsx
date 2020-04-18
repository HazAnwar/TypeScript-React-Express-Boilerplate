import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';

function App() {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
