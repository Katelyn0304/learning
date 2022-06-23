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

async function updateFirst(id) {
    // { _id: id } -> { isPublished: false }
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });

    console.log(result);

    // if want to get the updated document, replace update with findByIdAndUpdate and add third object { new: true }
}

updateFirst('629c8420e76f3ef5897ae7cd');