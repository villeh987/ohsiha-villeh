const { pool } = require('./db');

module.exports = {

    async getUserByEmail(email, callback) {
        pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, results) => {
            if (err) {
                throw err;
            }
            //console.log(results.rows);
            return callback(results);
        });

    },

    findOne() {

    },

    createUser(user, callback) {
        pool.query(`INSERT INTO users (name, email, role, password) VALUES ('${user.name}', '${user.email}', '${user.role}', '${user.password}')`, (err, results) => {
            //console.log(results);
            if (err) {
                throw err;
            }
            return callback(true);
        });
        
    },

    async findOneByRole(role, callback) {
        pool.query(`SELECT * FROM users WHERE role='${role}'`, (err, results) => {
            //console.log(results);
            if (err) {
                throw err;
            }
            return callback(results.rows);
        });
    },

    getUsers(req, res) {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results.rows);
        res.json(results.rows);
    });
}


}