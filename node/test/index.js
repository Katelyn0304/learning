const mongoose = require('mongoose');
const express = require('express');
const app = express();
const test = require('./mon');

mongoose.connect('mongodb://localhost/test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/test', test);


const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));