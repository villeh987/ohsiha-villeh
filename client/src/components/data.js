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

        axios.get(`http://localhost:5000/api/search?criteria=${this.state.criteria}&page=1`, {cancelToken: this.cancel.token, withCredentials: true})
        .then(json => {

            const totalResults = json.data.totalResults;
            const totalPages = ((totalResults % 10) > 0) ? (totalResults / 10) + 1 : totalResults / 10;
            const apiPromises = [];
            let processedResponses = [];

            var page;
            for (page = 1; page <= totalPages; page++) {
                apiPromises.push(axios.get(`http://localhost:5000/api/search?criteria=${this.state.criteria}&page=${page}`, {cancelToken: this.cancel.token, withCredentials: true}))
            }

            Promise.all(apiPromises)
            .then(responses => {           
                responses.forEach(response => {
                    processedResponses = processedResponses.concat(response.data.Search);
                })
                console.log("Mapped Responses:", processedResponses);

                let message = '';

                if (json.data.Error) {
                    message = json.data.Error;
                } 
                //const message = !json.data.totalResults ? "Too many results" : '';

                //console.log(json);
                const analyse = json.data.Search === undefined ? [] : processedResponses;

                this.setState({
                    isLoaded: true,
                    searched: true,
                    items: json.data,
                    analysis: analyse,
                    message: message
                })
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

        let {isLoaded, items, message, analysis} = this.state;
        //console.log(items);

        const charts = <div>
                        <Chart data={analysis} attribute="Type" width="300" height="300" innerRadius="35" outerRadius="100"/>
                        <Chart data={analysis} attribute="Year" width="300" height="300" innerRadius="35" outerRadius="100"/> 
                      </div>

        return (
            <div className="search-container">

                <ReactLoading className={`search-loader ${!isLoaded ? 'show' : 'hide' }`} type={"bars"} color={"black"} />
                

                

                <p className="message">{message}</p>

                <input type="text" className="search-bar" id="search-bar" name="criteria" placeholder="Search" value={this.state.email} onChange={this.handleChange} autoComplete="off"></input>
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                {(analysis !== undefined &&analysis.length > 0) && charts}

                {/*console.log("täältä lähtee:", this.state.analysis) */}
                


                {(this.state.searched && items.Response === 'True') &&

                    <div>
                        <h2>Results: {items.totalResults}</h2>
                        <ul>
                            {items.Search.map( (item, index) => (
                                <li key={index}>
                                    <div>
                                        <span className="caption">{item.Title} ({item.Year})</span>
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
