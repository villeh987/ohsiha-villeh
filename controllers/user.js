
//const User = require('../models/user');
const { pool } = require('../db');
const sql = require('../sql.js');
const bcrypt = require('bcrypt');

function validateUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '' && user.email.includes('@');
    const validUserName = user.name.length < 30;
    const validPassword =   typeof user.password == 'string' &&
                            user.password.trim() != '' &&
                            user.password.trim().length >= 0;

    return validEmail && validUserName && validPassword;
}

module.exports = {

    /**
     * Creates a new user
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async createUser(request, response) {
        if (!validateUser(request.body)) {
            // error
            response.status(404);
            response.json({message: 'Inputs not valid'});
            return false;
        } 

        sql.getUserByEmail(request.body.email, function(result) {

            if (result.rowCount > 0) {
                //console.log("Already exists!");
                response.status(404);
                response.json({message: 'Email already in use'});
                return false;
            } else {
                sql.createUser(request.body, function(result) {
                    if (result) {

                    }
                    response.json({message: 'User registered uccesfully!'});
                });
            }
        });
    },


    /**
     * Returns a form for a user to login
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    login(request, response) {

        sql.getUserByEmail(request.body.email, function(result) {
            if (result.rowCount === 0) {
                response.status(404);
                response.json( {message: 'Invalid email or password'});

            } else {
                const user = result.rows[0];
                bcrypt.compare(request.body.password, user.password)
                .then((res)=> {
                    if (res) {
                        request.session.user = {id: user.id, name: user.name, email: user.email};
                        response.json({message: 'User found!'});  
                        
                    } else {
                        response.status(404);
                        response.json({message: 'Invalid email or password'}); 
                    }
                });
            }
        });

    },

    /**
     * Checks that the request is authenticated
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    loggedIn(request, response) {
        request.session.user ? response.json({loggedIn: true, user: request.session.user}) : response.json({loggedIn: false, user: {}});
    },


    /**
     * User logs out and gets redirected to a login page.
     *
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    logout(request, response) {
        console.log(request.headers.cookie);
        if (request.session.user && request.headers.cookie) {

            response.clearCookie('ohsiha');
            response.json({status: 'Logged out'});
        } else {
            response.json({status: 'Already logged out'});
        }
    }
};
