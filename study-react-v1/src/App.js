import React, { Component } from 'react';
import CRUDTableTemplate from './components/crud-template/CRUDTableTemplate';


import logo from './logo.svg';
import './App.css';

/* eslint-disable */
var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div className="App-body">
          <div className="col-md-12">
            <CRUDTableTemplate />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
