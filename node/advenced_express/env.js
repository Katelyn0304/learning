const express = require("express");
const app = express();
const morgan = require('morgan');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // this will stand undefined if we don't set the environment
console.log(`app: ${app.get('env')}`); // this will return development by defult

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...'); // if we set NODE_ENV=production, it won't log on console.
}