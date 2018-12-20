const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport.js')(passport);
const jwt = require('jsonwebtoken');
const config = require('@config');
const database = require('./database.js')(mongoose, config);

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('budgetsecret', config.secret);
consign({ cwd: 'services' })
    .include('BudgetManagerAPI/app/setup')
    .then('BudgetManagerAPI/app/api')
    .then('BudgetManagerAPI/app/routes')
    .into(app);
    
module.exports = app;
