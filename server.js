const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
    next();
});

app.use('/api/user', require('./api/user'));
app.use('/api/auth', require('./api/auth'));

var port = 3000;
app.listen(port, () => {
    console.log('listening on port:' + port);
});