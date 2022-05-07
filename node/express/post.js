const express = require("express");
const app = express();

app.use(express.json()); //It will be introduced in the feature lecture.

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
        name: req.body.name // the latter name corresponds to what I type in postman => "name": "new course"
    };
    courses.push(course);
    res.send(course); // and it will return id: number, name: new course
});

// By the way, status 200 means that the request was handled successfully

app.listen(3000, () => console.log('Listening on port 3000...'));