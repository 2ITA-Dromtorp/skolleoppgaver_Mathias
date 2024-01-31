// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Quiz from "./Quiz";
import Score from "./Score";
import Login from './Login';
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="login_box">
          <Router>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/score" component={Score} />
            </Switch>
          </Router>
        </div>
      </header>
    </div>
  );
};

export default App;
