const mongoose = require('mongoose');
const users = require('./routes/users');
const personal_cases = require('./routes/personal_cases');
const company_cases = require('./routes/company_cases');
const auth = require('./routes/auth');
const express = require('express');
const config = require('config');
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));