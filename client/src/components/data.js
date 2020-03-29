import React, {Component} from 'react';
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './data.css';
const axios = require('axios').default;

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: true,
            searched: false,
            criteria: '',
            message: ''
        }

        this.makeSearch = this.makeSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            message: ''
        });
    }


    makeSearch() {
        this.setState({isLoaded: false});
        axios.get(`http://localhost:5000/api/search?criteria=${this.state.criteria}`, {withCredentials: true})
        .then(json => {
            console.log(json);
            this.setState({
                isLoaded: true,
                searched: true,
                items: json.data
            })
        })
        .catch(error => console.log(error));
    }

    /*componentDidMount() {
        /*axios.get('http://localhost:5000/api/search?criteria=batman', {withCredentials: true})
        .then(json => {
            console.log(json);
            this.setState({
                isLoaded: true,
                items: json.data
            })
        })
        .catch(error => console.log(error)); 
    } */


    render() {

        let {isLoaded, items} = this.state;
        //console.log(items);

        if (!isLoaded) {
            return <ReactLoading className="search-loader" type={"bars"} color={"black"} />;
        } else if (this.state.searched){
            return (
                <div>
                    <h2>Results: {items.totalResults}</h2>
                    <input type="text" className="search-bar" id="search-bar" name="criteria" placeholder="Search" value={this.state.criteria} onChange={this.handleChange} autoComplete="off"></input>
                    <button type="submit" className="searchbutton" disabled={!this.state.criteria} onClick={this.makeSearch}><FontAwesomeIcon icon={faSearch} /></button>
                    <ul>
                        {items.Search.map(item => (
                            <li key={item.imdbID}>
                                <div>
                                    <span className="caption">{item.Title}</span>
                                    <img src={item.Poster} alt="NO_IMAGE"/>
                                </div>
                            </li>
                            ))}
                    </ul>
                </div>
            );  
        } else {
            return (
                <div>
                    <input type="text" className="search-bar" id="search-bar" name="criteria" placeholder="Search" value={this.state.email} onChange={this.handleChange} autoComplete="off"></input>

                    <button type="submit" className="searchbutton" disabled={!this.state.criteria} onClick={this.makeSearch}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            );  
        }
    }
}

export default Data;
