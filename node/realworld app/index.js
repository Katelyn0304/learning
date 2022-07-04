const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const personal_cases = require('./routes/personal_cases');
const company_cases = require('./routes/company_cases');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/app')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/personal_cases', personal_cases);
app.use('/api/company_cases', company_cases);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));