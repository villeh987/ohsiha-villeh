import React, {Component} from 'react';
import './data.css';

require('dotenv').config();

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?s=batman&apikey=`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                isLoaded: true,
                items: json
            })
        })
    }


    render() {

        let {isLoaded, items} = this.state;
        //console.log(items);

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.Search.map(item => (
                        <li key={item.imdbID}>
                            <div>
                                <span className="caption">{item.Title}</span>
                                <img src={item.Poster}/>
                            </div>
                        </li>
                        ))}
                </ul>
            );  
        }
    }
}

export default Data;
