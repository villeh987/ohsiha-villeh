const sql = require('./sql');

module.exports =  async userConfig=> {

    sql.findOneByRole('admin', function (result) {

        if (result.length != 0) {
            console.log("At least 1 admin found!");
        } else {
            sql.createUser(userConfig, function (result) {
                if (result) {
                    console.log("Successfully created admin!");
                    return 'Successfully created admin!';
                } else {
                    console.log('Admin user creation failed!');
                    return 'Admin user creation failed!';                 
                }
            });
        }
    });
}
