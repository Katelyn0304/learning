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

async function createCourse() {
    const course = new Course({
        _id: "5a6900fff467be65019a9001",
        tags: ["angular","frontend"],
        date: "2018-01-24T21:56:15.353Z",
        name: "Angular Course",
        author: "Mosh",
        isPublished: true,
        price: 15,
        __v: 0
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();