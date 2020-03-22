import React, {Component} from 'react';
import './navbar.css';
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
                    <Link to="/logout">
                    <li>Logout</li>
                    </Link>
                    <Link to="/data">
                    <li>Data</li>
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
                 </ul> 
        }

        return (
            <nav>
                {nav}
            </nav>
        );  
    }
}

export default Navbar;
