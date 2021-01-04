const { poolPromise } = require('../config/database')
const sql = require('mssql')
const jwt = require('jsonwebtoken');

class LoginController {

    async loginUser(req, res) {
        try {
            const body = req.body;
            const pool = await poolPromise
            const result = await pool.request()
                .execute('sp_fetchStudents', function (err, profileset) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var send_data = profileset.recordset
                        const user = send_data.filter(user => user.email == body.username)[0];
                        if (!user) {
                            res.send({
                                flag: 0,
                                status: 'failed',
                                message: 'Username or password is wrong.'
                            });
                        } else {
                            var token = jwt.sign({ userID: user.id }, 'mean-secret', { expiresIn: '2h' });
                            res.send({
                                flag: 1,
                                status: 'Success',
                                message: 'Login successful!',
                                token: token
                            });
                        }
                    }
                })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}


const controller = new LoginController()
module.exports = controller;