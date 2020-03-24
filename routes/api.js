const express = require('express');

const router = express.Router();
const ApiController = require('../controllers/api');


router
    .route('/search')
    .get(ApiController.search);

module.exports = router;
