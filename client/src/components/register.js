import React, {Component} from 'react';
import './register.css';


const axios = require('axios').default;


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password
        }

        axios.post('http://localhost:5000/user/register', payload, {withCredentials: true})
        .then(response => {
            if (response.status === 200) {
                this.props.history.push('/home');
            }
        })
        .catch(error => {
            this.setState({error: error.response.data.message, inputClass: 'errorInput'});
        })
    }


    render() {
        return (
                <div>
                    <h1>Register</h1>
                    <form className="container" onSubmit={this.handleClick}>
                        <input className={this.state.inputClass} type="text" id="username" name="name" placeholder="Your username" value={this.state.name} autoComplete="off" onChange={this.handleChange} required/>
                        <input className={this.state.inputClass} type="text" id="email" name="email" placeholder="Email" value={this.state.email} autoComplete="off" onChange={this.handleChange} required/>
                        <input className={this.state.inputClass} type="password" id="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} required/>
                        <button className="registerButton" type="submit">Submit</button>
                    </form>
                    {this.state.error && <h3 className="error">{this.state.error}</h3>}
                </div>
            
        );  
    }
}

export default Register;
