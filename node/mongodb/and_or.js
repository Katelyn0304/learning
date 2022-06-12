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
        .find({ isPublished: true })
        .or([ { author: 'Mosh' }, { tags: 'node' } ])
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        
        // .find()
        // .or([ {}, {} ])
        // .and([ {}, {} ])

    console.log(courses);
}

getCourses();