require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')
const sql = require('./sql.js');

const config = require('config');
const sessionConfig = config.get('session');
const adminConfig = config.get('admin');

const { pool } = require('./db');
require('./setup')(adminConfig);


app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
    })
);

app.use(helmet());

app.use(session(sessionConfig));


require('./router.js')(app);



// error handler
/*app.use(function(error, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error =
        request.app.get('env') === 'development' ? error : {};
    response.locals.title = `${error.status || 500} ${error.message}`;
    response.locals.heading = `${request.method} ${request.url}`;

    // send response
    response.status(error.status || response.statusCode || 500);
    if (request.baseUrl !== '/api') return response.json('error');

    response.json({
        message: response.locals.message,
        error: response.locals.error
    });
}); */


app.listen(port, () => console.log(`Listening on port ${port}`));
