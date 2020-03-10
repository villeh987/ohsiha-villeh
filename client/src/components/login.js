import React, {Component} from 'react';
import './login.css';
import auth from '../auth';

const axios = require('axios').default;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
                auth.login( () => {
                    this.props.history.push('/');
                })
            }
        })
        .catch(error => {
            console.log('Error:', error.body);
        })
    }

    render() {
        return (
            <div>
            <h1>Login</h1>
            <form onSubmit={this.handleClick}>
                <input type="text" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                <input type="password" id="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange}/>
                <button type="submit">Submit</button>
            </form>
            </div>
            
        );  
    }
}

export default Login;
