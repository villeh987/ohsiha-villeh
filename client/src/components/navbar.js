import React, {Component} from 'react';
import './navbar.css';
import Logo from '../logo.svg';
import {Link} from 'react-router-dom';


class Navbar extends Component {

    constructor(auth) {
        super();
    }

    render() {

        let nav;

        if (this.props.auth === true || sessionStorage.getItem('auth')) {
            nav = <ul className="nav-links">
                    <Link className="nav-link" to="/home">
                    <li>Home</li>
                    </Link>
                    <Link className="nav-link" to="/data">
                    <li>Search</li>
                    </Link>
                    <Link className="nav-link" to="/logout">
                    <li>Logout</li>
                    </Link>
                    <button className="about-button" onClick={e => {this.props.showModal();}} >About</button>
                 </ul>            
        } else {
            nav = <ul className="nav-links">
                    <Link className="nav-link" to="/login">
                    <li>Login</li>
                    </Link>
                    <Link className="nav-link" to="/register">
                    <li>Register</li>
                    </Link>      
                    <button className="about-button" onClick={e => {this.props.showModal();}} >About</button>
                 </ul> 
        }

        return (
            <div>
                <nav>
                    {/*<h2 className="app-name">OMDb App</h2>*/}
                    <img className="logo" src={Logo} alt="logo"/>
                    {nav}
                </nav>
            </div>
        );  
    }
}

export default Navbar;
