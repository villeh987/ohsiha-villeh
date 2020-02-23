
// Require routers
const UserRouter = require('./routes/user');

// Setup routes
module.exports = function(app) {
    app.use('/login', UserRouter);
};