const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const expressJwt = require('express-jwt');
http = require('http')
server = http.createServer(app)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authData = require('./routes/authroute')
app.use('/', authData)

const ProfileData = require('./routes/studentroute')
app.use('/', ProfileData)

app.use(expressJwt({ secret: 'mean-secret' }).unless({ path: [authData, ProfileData] }));

server.listen(8000, '127.0.0.1', function () {
    server.close(function () {
        server.listen(8001, '192.168.1.177')
    })
})

// app.listen(5000, function () {
//     console.log('Server is running..');
// }); 