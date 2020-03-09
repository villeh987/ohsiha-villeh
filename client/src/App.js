import React, { Component } from 'react';
import './App.css';
import Login from './components/login'
import Register from './components/register'
import Homepage from './components/homepage'
import Navbar from './components/navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

    state = {
        data: []
    };

    /*componentDidMount() {
    // Call fetch function below once the component mounts
        fetch('/test', { headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => this.setState({ data: res} ))
    } */

  render() {
    return (
    <Router>
      <div className="App">

        <ul>
         {this.state.data.map(el => (
          <li key={el.id}>
            Name: {el.name} Email: {el.email}
          </li>
          ))}
        </ul>
        <Navbar></Navbar>
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;