import React, { Component } from 'react';
import './App.css';
import auth from './auth';
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
  Link
} from "react-router-dom";

const axios = require('axios').default;

class App extends Component {

    state = {
        loggedInStatus: false,
        user: {}
    };

    checkLoginStatus() {
        axios.get("http://localhost:5000/user/auth", {withCredentials: true})
        .then(response=> {
            //console.log(response)
            if (response.data.loggedIn && this.state.loggedInStatus === false) {
                console.log("nyt tehää");
                this.setState({
                    loggedInStatus: true,
                    user: response.data.user
                });
                auth.login( () => {

                });

            } else if (!response.data.loggedIn && this.state.loggedInStatus === true) {                
                this.setState({
                    loggedInStatus: false,
                    user: {}
                });
                auth.logout( () => {

                });
            }

            console.log("Loggedinstatus:", this.state.loggedInStatus);
            console.log("isAuthenticated:", auth.isAuthenticated());
            
        })
        .catch(error => {
            console.log("Login required", error);
        })
    }

    componentDidMount() {
    // Call fetch function below once the component mounts
        this.checkLoginStatus()
        //console.log("Loggedinstatus:", this.state.loggedInStatus);
        //console.log("isAuthenticated:", auth.isAuthenticated());
    } 

    handleLogin(data) {
        this.setState({
            loggedInStatus: true,
            user: data.user
        });
    }



  render() {
    return (
    <Router>
      <div className="App">

        <Navbar auth={this.state.loggedInStatus}></Navbar>
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <ProtectedRoute path="/data"  component={Data}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="*" component={() => "Oops, looks like this page doesn't exist"} />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;