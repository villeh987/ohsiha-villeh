import React, {Component} from 'react';
import './logout.css';
import auth from '../auth';

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
                            auth.logout( ()=> {
                                this.props.history.push('/');
                            }); 
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
