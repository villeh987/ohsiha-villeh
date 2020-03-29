import React, {Component} from 'react';
import './login.css';
import {
  Redirect
} from "react-router-dom";

const axios = require('axios').default;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            inputClass: 'normal'
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    handleClick(event) {
        //console.log(this.state.name, this.state.email, this.state.password);
        event.preventDefault();
        const payload = {
            "email": this.state.email,
            "password": this.state.password
        }

        axios.post('http://localhost:5000/user/login', payload, {withCredentials: true})
        .then(response => {
            if (response.status === 200) {
                console.log(response.data.message);

                sessionStorage.setItem('auth', 'true');
                this.props.checkLoginStatus();
                this.props.history.push('/home');
            } 
        })
        .catch(error => {
            console.log('Error:', error.response.data.message);
            this.setState({error: error.response.data.message, inputClass: 'errorInput'});
        }) 
    }

    render() {
        if (sessionStorage.getItem('auth')) {
            return (
                <Redirect to={{pathname: "/home"}} />
            ) 
        } else {
            return (
                <div>
                    <h1>Login</h1>
                    <form className="container" onSubmit={this.handleClick}>
                        <input className={this.state.inputClass} type="text" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                        <input className={this.state.inputClass} type="password" id="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} required/>
                        <button className="loginButton" type="submit">Submit</button>
                    </form>
                    {this.state.error && <h3 className="error">{this.state.error}</h3>}
                </div>
                
            );
        }  
    }
}

export default Login;
