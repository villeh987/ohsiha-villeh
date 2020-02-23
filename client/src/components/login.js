import React, {Component} from 'react';
import './login.css';

class Login extends Component {

    state = {
        data: ''
    };

    /*componentDidMount() {
    // Call fetch function below once the component mounts
        fetch('/register')
        .then(res => this.setState({ data: res} ))
    } */

    render() {
        return (
            <div>
                <form action="/login" method="POST">
                    <input type="text" id="username" name="username" placeholder="Your username"/>
                    <input type="password" id="password" name="password" placeholder="Your password"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            
        );  
    }
}

export default Login;
