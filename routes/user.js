const express = require('express');
//const passport = require('passport');
const auth = require('../auth');
//const csurf = require('csurf');
//const csrfProtection = csurf({ cookie: false });

const router = express.Router();
const UserController = require('../controllers/user');


// Register user
router
    .route('/register')
    .post(UserController.createUser);
    /*.all( (request, response, next) => {
        if (!userLoggedIn(request)) {
            return next();
        }
        response.redirect('/');
    }) */



/*// Login user
router
    .route('/login')
    .all(auth.forwardAuthenticated)
    .get(UserController.login)
    .post((req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true,
            successFlash: true
        })(req, res, next);
    });


// Logout
router.get('/logout', UserController.logout); */

module.exports = router;
