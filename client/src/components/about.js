import React, {Component} from 'react';
import './about.css';
import Close from '../close.png';


class About extends Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
  };

    render() {
        if(!this.props.show){
            return null;
        }

        return (
            <div className="about">
                <button class="toggle-button" onClick={this.onClose}><img src={Close}/></button>
                <h2 className= "about-title">About</h2>
                <div className="content">
                        <p>This app has been created as part of Ohjelmallinen sisällönhallinta course. </p>
                        <p>This project can be viewed at:</p>
                        <a href="https://github.com/villeh987/ohsiha-villeh" target="_blank">GitHub page</a>
                </div>
                <div className="actions">
                </div>
            </div>           
        );  
    }
}

export default About;
