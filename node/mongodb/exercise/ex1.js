const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exercise')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    _id: String,
    tags: [ String ],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ tags: 'backend', isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();