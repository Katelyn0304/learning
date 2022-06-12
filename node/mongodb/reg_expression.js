const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    const courses = await Course
        .find({ author: /^Mosh/ })
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })

        // Starts with Mosh
        // .find({ author: /^Mosh/ })

        // Ends with Hamedani
        // .find({ author:  /Hamedani$/i }) // i makes it insensitive

        // Contains Mosh
        // .find({ author: /.*Mosh.*/i })

    console.log(courses);
}

getCourses();