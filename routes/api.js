const express = require('express');

const router = express.Router();
const ApiController = require('../controllers/api');


router
    .route('/search')
    .get(ApiController.search);

router
    .route('/searchbyid')
    .get(ApiController.searchById);

module.exports = router;
