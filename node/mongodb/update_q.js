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

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    // if (course.isPublished) return;

    course.isPublished = true;
    course.author = 'Another author';

    const result = await course.save();
    console.log(result);
}

updateCourse('629c8420e76f3ef5897ae7cd');