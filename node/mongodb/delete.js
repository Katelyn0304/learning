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

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    // const result = await Course.deleteMany({ isPublished: false });
    console.log(result);
    // const course = await Course.findByIdAndRemove(id); check the document after deleted
}

removeCourse('629c83a9d4d2fadf4199504a');