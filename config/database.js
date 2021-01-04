// DB.js config for your database  

const sql = require('mssql')

const config = {
    user: 'your-username',
    password: 'your-password',
    server: "your-servername",
    database: "your-databasename",
    options: {
        "encrypt": false,
        "enableArithAbort": false
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err)
    })

module.exports = { sql, poolPromise }  