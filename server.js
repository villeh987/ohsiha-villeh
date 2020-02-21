const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const { pool } = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
    })
);

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results.rows);
        res.json(results.rows);
    });
}

// create a GET route
app.get('/test', getUsers);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));




