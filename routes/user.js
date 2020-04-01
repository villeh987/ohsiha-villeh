const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();



// Register user
router
    .route('/register')
    .post(UserController.createUser);

// Login user
router
    .route('/login')
    .post(UserController.login);

// Authenticate user
router
    .route('/auth')
    .get(UserController.loggedIn);

// Logout
router.get('/logout', UserController.logout); 

module.exports = router;
