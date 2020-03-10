
//const User = require('../models/user');
const { pool } = require('../db');
const sql = require('../sql.js');
const bcrypt = require('bcrypt');

function validateUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validUserName = user.name.length < 30;
    const validPassword =   typeof user.password == 'string' &&
                            user.password.trim() != '' &&
                            user.password.trim().length >= 0;

    //console.log("name:", validUserName, "email:", validEmail, "password", validPassword);

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
            console.log("vituiks män");
            response.status(500);
            response.end("Not valid user!");
            return false;
        } 

        sql.getUserByEmail(request.body.email, function(result) {

            if (result.rowCount > 0) {
                //console.log("Already exists!");
                response.status(500);
                response.end('Already exists with that email!');
                return false;
            } else {
                sql.createUser(request.body, function(result) {
                    if (result) {
                        console.log("Succesfully created new user!");
                    }
                    response.end('User creation succesfull!');
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
        //console.log(request.body);
        sql.getUserByEmail(request.body.email, function(result) {
            if (result.rowCount === 0) {
                response.status(500);
                response.json( {message: 'Invalid email or password'});
            } else {
                //console.log(result);
                const user = result.rows[0];
                bcrypt.compare(request.body.password, user.password)
                .then((res)=> {
                    if (res) {
                        /*response.cookie('user_id', user.id, {
                            httpOnly: true,
                            secure: request.app.get('env') != 'development',
                            //signed: true
                        }); */
                        request.session.user = {id: user.id, name: user.name, email: user.email};
                        response.json({message: 'User found!'});  
                    } else {
                        response.status(500);
                        response.json({message: 'Invalid email or password'}); 
                    }

                });

            }
        });

    },



    loggedIn(request, response) {
        request.session.user ? response.json({loggedIn: true, user: request.session.user}) : response.json({loggedIn: false, user: {}});
        console.log(request.sessionID);
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
        /*
        request.session.destroy(()=> {
            response.clearCookie('user_id');
            response.json({status: 'Logged out'});
        });*/

    },

    /**
     * Returns a form for user to register
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    register(request, response) {

    }
};
