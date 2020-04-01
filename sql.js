const { pool } = require('./db');
const bcrypt = require('bcrypt');

module.exports = {

    async getUserByEmail(email, callback) {
        pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, results) => {
            if (err) {
                throw err;
            }
            return callback(results);
        });
    },

    createUser(user, callback) {
        const hash = bcrypt.hashSync(user.password, 10);
        const role = user.role ? user.role : 'viewer';

        pool.query(`INSERT INTO users (name, email, role, password) VALUES ('${user.name}', '${user.email}', '${role}', '${hash}')`, (err, results) => {
            if (err) {
                throw err;
            }
            return callback(true);
        });       
    },

    async findOneByRole(role, callback) {
        pool.query(`SELECT * FROM users WHERE role='${role}'`, (err, results) => {
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
