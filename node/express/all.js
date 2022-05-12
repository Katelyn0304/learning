const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
    { id: 5, name: 'course5' }
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { value, error } = schema.validate({name: req.body.name});

    if (error) return res.status(400).send(error.details[0].message);

    const a = courses[courses.length - 1]; // the last object in array

    const course = {
        id: a.id + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const { value, error } = schema.validate({name: req.body.name});
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;

    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

app.listen(3000, () => console.log('Listening on port 3000...'));