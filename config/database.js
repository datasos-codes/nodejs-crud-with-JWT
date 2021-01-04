// DB.js config for your database  

const sql = require('mssql')

const config = {
    user: 'sa',
    password: 'sa123$',
    server: "ds07",
    database: "SchoolDB",
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