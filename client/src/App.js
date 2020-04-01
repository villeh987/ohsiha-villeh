import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import Homepage from './components/homepage';
import Navbar from './components/navbar';
import Data from './components/data';
import About from './components/about';
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
            user: {},
            show: false
        };

        this.checkLoginStatus = this.checkLoginStatus.bind(this);
        this.handleLogin = this.handleLogin.bind(this); 
    }

    showModal = e => {
        this.setState({ show: !this.state.show });
    }


    checkLoginStatus() {
        axios.get("user/auth", {withCredentials: true})
        .then(response=> {
            if (response.data.loggedIn && this.state.loggedInStatus === false) {
                this.handleLogin(response.data.user, true);

            } else if (!response.data.loggedIn && this.state.loggedInStatus === true) {               
                this.handleLogin({}, false);
                sessionStorage.clear();
            } else if (!response.data.loggedIn) {
                this.handleLogin({}, false);
                sessionStorage.clear();
            }
            
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

        let RedirectRoute = <Route path="/" exact render={() => <Redirect to={{pathname: "/login"}}/>} />;
        if (sessionStorage.getItem('auth')) {
            RedirectRoute = <Route path="/" exact render={() => <Redirect to={{pathname: "/home"}}/>} />;
        }

        return (
            <Router>
              <div className="App">
                <About show={this.state.show} onClose={this.showModal}/>
                <Navbar auth={this.state.loggedInStatus} showModal={this.showModal}></Navbar>
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