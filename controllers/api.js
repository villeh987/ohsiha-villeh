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
            console.log(error);
        });
    }
};
