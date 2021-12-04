import React from 'react';
import './App.css';
import firebaseConfig from './Firebase';
import { initializeApp } from "firebase/app";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/Login/index";
import Homepage from "./component/Homepage/index";

initializeApp(firebaseConfig);

function App() {
  
  return (
    <div className="App">
      <Router className="modal-container">
        <Switch>
          <Route path="/homepage" render={() => {
            return localStorage.getItem("token") ? <Homepage /> : <Login/>
          }}>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
