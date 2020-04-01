require('dotenv').config();
const axios = require('axios');

const APIKEY = process.env.APIKEY;

module.exports = {

    /**
     * Make a search to OMDB API
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    search(request, response) {
        const criteria = request.query.criteria;
        const page = request.query.page;

        axios.get(`http://www.omdbapi.com/?s=${criteria}&page=${page}&apikey=${APIKEY}`)
        .then(result => {
            response.json(result.data);
        })
        .catch(error => {
            if (error.response.status === 401) {
                response.status(401).send({message: 'API request limit reached!'});
            }
        });
    },

    /**
     * Make a search to OMDB API by ID
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    searchById(request, response) {
        const id = request.query.id;

        axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${APIKEY}`)
        .then(result => {
            response.json(result.data);
        })
        .catch(error => {
            console.log(error);
        }); 
    }
};
