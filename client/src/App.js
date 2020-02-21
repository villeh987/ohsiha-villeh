import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login'

class App extends Component {

    /*constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    } */

    state = {
        data: []
    };

    componentDidMount() {
    // Call fetch function below once the component mounts
        fetch('/test', { headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => this.setState({ data: res} ))
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        These are coming by fetch request from DB:
        <ul>
         {this.state.data.map(el => (
          <li key={el.id}>
            Name: {el.name} Email: {el.email}
          </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default App;