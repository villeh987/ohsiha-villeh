import React, {Component} from 'react';
import ReactLoading from "react-loading";
import './data.css';
const axios = require('axios').default;

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
        axios.get('http://localhost:5000/api/search?criteria=batman', {withCredentials: true})
        .then(json => {
            console.log(json);
            this.setState({
                isLoaded: true,
                items: json.data
            })
        })
        .catch(error => console.log("client:", error));
    }


    render() {

        let {isLoaded, items} = this.state;
        //console.log(items);

        if (!isLoaded) {
            return <ReactLoading type={"bars"} color={"white"} />;
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
