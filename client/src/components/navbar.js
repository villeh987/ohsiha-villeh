import React, {Component} from 'react';
import './navbar.css';
import Logo from '../logo.svg'
import {Link} from 'react-router-dom';
//import auth from '../auth';


class Navbar extends Component {

    constructor({auth}) {
        super();
        this.state = auth;
    }

    componentWillReceiveProps({auth}) {
        this.setState({...this.state, auth});
    }


    render() {

        let nav;

        if (this.state.auth === true || sessionStorage.getItem('auth')) {
            nav = <ul className="nav-links">
                    <Link to="/home">
                    <li>Home</li>
                    </Link>
                    <Link to="/data">
                    <li>Data</li>
                    </Link>
                    <Link to="/logout">
                    <li>Logout</li>
                    </Link>
                    <Link to="/about">
                    <li>About</li>
                    </Link>
                 </ul>            
        } else {
            nav = <ul className="nav-links">
                    <Link to="/login">
                    <li>Login</li>
                    </Link>
                    <Link to="/register">
                    <li>Register</li>
                    </Link>
                    <Link to="/about">
                    <li>About</li>
                    </Link>
                 </ul> 
        }

        return (
            
            <nav>
                <img className="logo" src={Logo} alt="logo"/>
                {nav}
            </nav>
        );  
    }
}

export default Navbar;
