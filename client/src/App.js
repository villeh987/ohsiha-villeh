import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import Homepage from './components/homepage';
import Navbar from './components/navbar';
import Data from './components/data';
import {ProtectedRoute} from './components/protected.route';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const axios = require('axios').default;

class App extends Component {

    constructor() {
        super();

        this.state = {
            loggedInStatus: false,
            user: {}
        };

        this.checkLoginStatus = this.checkLoginStatus.bind(this);
        this.handleLogin = this.handleLogin.bind(this); 
        //this.checkLoginStatus(); 
    }


    checkLoginStatus() {
        axios.get("http://localhost:5000/user/auth", {withCredentials: true})
        .then(response=> {
            if (response.data.loggedIn && this.state.loggedInStatus === false) {
                console.log("Yks");
                this.handleLogin(response.data.user, true);

            } else if (!response.data.loggedIn && this.state.loggedInStatus === true) {
                console.log("Kaks")                
                this.handleLogin({}, false);
                sessionStorage.clear();
            } else if (!response.data.loggedIn) {
                this.handleLogin({}, false);
                sessionStorage.clear();
            }

            console.log("Loggedinstatus:", this.state.loggedInStatus);
            
        })
        .catch(error => {
            console.log("Login required", error);
        })
    }

    componentDidMount() {
        this.checkLoginStatus()
    }

    handleLogin(user, loggedIn) {
        this.setState({
            loggedInStatus: loggedIn,
            user: user
        });
    }



  render() {
    //this.checkLoginStatus();

    let RedirectRoute = <Route path="/" exact render={() => <Redirect to={{pathname: "/login"}}/>} />;
    if (sessionStorage.getItem('auth')) {
        RedirectRoute = <Route path="/" exact render={() => <Redirect to={{pathname: "/home"}}/>} />;
    }

    return (
    <Router>
      <div className="App">

        <Navbar auth={this.state.loggedInStatus}></Navbar>
        <Switch>
            {RedirectRoute}
            <ProtectedRoute path="/home" exact component={Homepage}/>
            <ProtectedRoute path="/data" auth={this.state.loggedInStatus} component={Data}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" render={(props) => <Login {...props} checkLoginStatus={this.checkLoginStatus} />} />
            <Route path="/logout" render={(props) => <Logout {...props} handleLogin={this.handleLogin} />} />
            <Route path="*" component={() => "Oops, looks like this page doesn't exist"} />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;