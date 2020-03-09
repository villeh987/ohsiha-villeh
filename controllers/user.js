
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
                response.json( {message: 'Invalid email or password'});
            } else {
                //console.log(result);
                const user = result.rows[0];
                bcrypt.compare(request.body.password, user.password)
                .then((res)=> {
                    if (res) {
                        response.cookie('user_id', user.id, {
                            httpOnly: true,
                            secure: request.app.get('env') != 'development',
                            //signed: true
                        });
                        response.json({message: 'User found!'});  
                    } else {
                        response.json({message: 'Invalid email or password'}); 
                    }

                });

            }
        });

    },

    /**
     * User logs out and gets redirected to a login page.
     *
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    logout(request, response) {
        request.logout();
        request.flash('successMessage', 'You have logged out');
        response.redirect('/users/login');
    },

    /**
     * Returns a form for user to register
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    register(request, response) {

    }
};
