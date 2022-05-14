const express = require("express");
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');

// Environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // this will stand undefined if we don't set the environment
console.log(`app: ${app.get('env')}`); // this will return development by defult

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...'); // if we set NODE_ENV=production, it won't log on console.
}

// Middleware function
// Speaking of middleware function, there are two middleware functions we had already seen.
// One is app.use(express.json()), and the other is (req, res) =>
// express.json() is a middleware function just like logger, its architecture is also like logger.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(logger);
app.use(authenticate);

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.listen(3000, () => console.log(`Listening on port 3000...`));