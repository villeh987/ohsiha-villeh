
//const User = require('../models/user');

function validateUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validUserName = '';
    const validPassword =   user.password == 'string' &&
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


    },



    /**
     * Returns a form for a user to login
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    login(request, response) {
        response.render('user/login');
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
        response.render(`<!doctype html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>Login</title>
                    </head>
                    <body>
                        <form action="/login" method="POST">
                            <input type="text" id="username" name="username" placeholder="Your username">
                            <input type="password" id="password" name="password" placeholder="Your password">
                            <button type="submit">Submit</button>
                        </form>
                </html>`);
    }
};
