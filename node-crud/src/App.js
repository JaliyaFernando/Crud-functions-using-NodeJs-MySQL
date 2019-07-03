import React, { Component } from 'react';
import Main from './main';
import NavBar from './NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <NavBar/>
        </div>
        <div>
          <Main/>
        </div>
      </div>
    );
  }
}

export default App;
