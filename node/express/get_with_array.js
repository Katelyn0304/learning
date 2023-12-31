const express = require("express");
const app = express();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// When tou want to get the specific value in an array, use arrayname.find
app.get('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); // req.params.id is a string, parseTnt() in javascript = int() in python
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course); // Is here need else ?
    // console.log(typeof(req.params.id));
});

app.listen(3000, () => console.log('Listening on port 3000...'));