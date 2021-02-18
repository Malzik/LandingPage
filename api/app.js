const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.get('/api/:classe/:groupe', indexRouter.get_week);
app.get('/api/:classe/:groupe/:date', indexRouter.get_week);
app.post('/api/:classe/:groupe/:date', indexRouter.refresh);

app.use('/', function(req, res) {
    res.json({message: "Bienvenue sur mon api de récupération d'emploi du temps de l'EPSI"})
});

module.exports = app;
