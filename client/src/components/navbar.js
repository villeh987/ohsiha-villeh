import React, {Component} from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';


class Navbar extends Component {


    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <Link to="/logout">
                    <li>Logout</li>
                    </Link>
                    <Link to="/data">
                    <li>Data</li>
                    </Link>
                </ul>
            </nav>
        );  
    }
}

export default Navbar;
