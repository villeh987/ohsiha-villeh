import React, {Component} from 'react';
import './navbar.css';
import Logo from '../logo.svg';
import About from './about';
import {Link} from 'react-router-dom';
//import auth from '../auth';


class Navbar extends Component {

    constructor(auth) {
        super();
        this.state = {
            auth: '',
            //show: false
        };
    }

    componentWillReceiveProps(auth) {
        this.setState({...this.state, auth});
    }

    /*showModal = e => {
        this.setState({ show: !this.state.show });
    };*/


    render() {

        let nav;

        if (this.state.auth === true || sessionStorage.getItem('auth')) {
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
                    {/*<Link to="/about">
                    <li>About</li>
                    </Link> */}
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
                    {/*<Link to="/about">
                    <li>About</li>
                    </Link> */}
                    
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
                {/*<About show={this.state.show} onClose={this.showModal}/> */}
            </div>
        );  
    }
}

export default Navbar;
