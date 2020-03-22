import React, {Component} from 'react';
import './register.css';


const axios = require('axios').default;


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password
        }

        axios.post('http://localhost:5000/user/register', payload, {withCredentials: true})
        .then(response => {
            if (response.status === 200) {

            }
            //console.log(response);
        })
        .catch(error => {
            console.log('Error:', error.body);
        })
    }


    render() {
        return (
            <div className="container">
            <h1>Register</h1>
            <form onSubmit={this.handleClick}>
 
                <input type="text" id="username" name="name" placeholder="Your username" value={this.state.name} onChange={this.handleChange} required/>
                <input type="text" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                <input type="password" id="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} required/>
                <button type="submit" onClick={this.handleClick}>Submit</button>
            </form>
            </div>
            
        );  
    }
}

export default Register;
