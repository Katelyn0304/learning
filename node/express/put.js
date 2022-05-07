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

app.put('/api/courses/:id', (req, res) => {
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // If invalid, return 400
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const { value, error } = schema.validate({name: req.body.name});
    if (error) return res.status(400).send(error.details[0].message);

    // Update course
    course.name = req.body.name;

    // Return the updeted course
    res.send(course);
})

app.listen(3000, () => console.log('Listening on port 3000...'));