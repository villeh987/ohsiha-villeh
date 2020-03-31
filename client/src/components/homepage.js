import React, {Component} from 'react';
import './homepage.css';


class Homepage extends Component {


    render() {
        return (
            <div>
                <h1 className="homepage-title">Welcome to the OMDb App!</h1>
                <div className="homepage-text">
                    <p>With this app You can search the database for your favorite movies and quickly view their posters, for example. This app uses the Open Movie database API that provides free data about movies.</p>
                    <p>Start searchin' by choosing "Search" from the navigation bar.</p>
                    <p>Visit the OMDb website at:</p>
                    <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a>
                </div>
            </div>
            
        );  
    }
}

export default Homepage;
