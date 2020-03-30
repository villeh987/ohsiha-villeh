import React, {Component} from 'react';
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Chart from './chart';
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
            analysis: [],
            message: ''
        }

        this.makeSearch = this.makeSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.cancel = '';
    }

    handleChange(event) {
        const query = event.target.value;
        if (!query || query === ' ') {
            this.setState({
                [event.target.name]: event.target.value, 
                message: '',
                items: []
            });
        } else {
                this.setState({
                [event.target.name]: event.target.value, 
                message: '',
                isLoaded: false
            }, () => {
                this.makeSearch();
            });
        }

    }


    makeSearch() {
        this.setState({isLoaded: false});

        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(`http://localhost:5000/api/search?criteria=${this.state.criteria}`, {cancelToken: this.cancel.token, withCredentials: true})
        .then(json => {

            let message = '';

            if (json.data.Error) {
                message = json.data.Error;
            } 
            //const message = !json.data.totalResults ? "Too many results" : '';

            console.log(json);
            this.setState({
                isLoaded: true,
                searched: true,
                items: json.data,
                analysis: json.data.Search,
                message: message
            })
        })
        .catch(error => {
            if (axios.isCancel(error) || error) {
                this.setState({searched: false, isLoaded: true, message: 'Search failed'});
            }
        });
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

        let {isLoaded, items, message} = this.state;
        //console.log(items);

        return (
            <div className="search-container">

                <ReactLoading className={`search-loader ${!isLoaded ? 'show' : 'hide' }`} type={"bars"} color={"black"} />

                { message && <p className="message">{message}</p> }
                <input type="text" className="search-bar" id="search-bar" name="criteria" placeholder="Search" value={this.state.email} onChange={this.handleChange} autoComplete="off"></input>
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                <Chart data={this.state.analysis} attribute="Type"/> 
                {console.log("täältä lähtee:", this.state.analysis)}
                


                {(this.state.searched && items.Response === 'True') &&

                    <div>
                        <h2>Results: {items.totalResults}</h2>
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
                }

            </div>
        )
    }
}

export default Data;
