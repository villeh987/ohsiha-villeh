
// Require routers
const UserRouter = require('./routes/user');
const ApiRouter = require('./routes/api');

// Setup routes
module.exports = function(app) {
    app.use('/user', UserRouter);
    app.use('/api', ApiRouter)
};
