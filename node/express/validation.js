const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { value, error } = schema.validate({name: req.body.name});
    console.log({ value, error });

    if (error) return res.status(400).send(error.details[0].message); //status 400 means bad request, and what does return mean ?

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.listen(3000, () => console.log('Listening on port 3000...'));