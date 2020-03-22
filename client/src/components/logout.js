import React, {Component} from 'react';
import './logout.css';
//import auth from '../auth';

const axios = require('axios').default;

class Logout extends Component {


    render() {
        return (
            <div>
                <h1>Logout</h1>
                <button type="button" onClick={ ()=> {

                    axios.get("http://localhost:5000/user/logout", {withCredentials: true})
                    .then(response => {
                        if (response.data.status) {
                            sessionStorage.clear();
                            this.props.history.push('/login');
                            this.props.handleLogin({}, false);
                        }
                    })
                    .catch(error => {
                        console.log('Error:', error.body);
                    });
                }}
                >
                Logout
                </button>
            </div>
            
        );  
    }
}

export default Logout;
