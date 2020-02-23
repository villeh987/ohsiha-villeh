require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');

const { pool } = require('./db');
const config = require('config');
const sessionConfig = config.get('session');
const adminConfig = config.get('admin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
    })
);

app.use(helmet());

app.use(session(sessionConfig));

require('./router.js')(app);

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results.rows);
        res.json(results.rows);
    });
}

// error handler
app.use(function(error, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error =
        request.app.get('env') === 'development' ? error : {};
    response.locals.title = `${error.status || 500} ${error.message}`;
    response.locals.heading = `${request.method} ${request.url}`;

    // send response
    response.status(error.status || 500);
    if (request.baseUrl !== '/api') return response.render('error');

    response.json({
        message: response.locals.message,
        error: response.locals.error
    });
});

// create a GET route
app.get('/test', getUsers);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));




