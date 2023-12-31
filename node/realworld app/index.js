const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const error = require('./middleware/error');
const mongoose = require('mongoose');
const users = require('./routes/users');
const personal_cases = require('./routes/personal_cases');
const company_cases = require('./routes/company_cases');
const auth = require('./routes/auth');
const express = require('express');
const config = require('config');
const app = express();

process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

const p = Promise.reject(new Error('Something failed miserably!'));
p.then(() => console.log('Done'));

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/app' }));

throw new Error('Something failed during startup.');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/app')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/personal_cases', personal_cases);
app.use('/api/company_cases', company_cases);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));