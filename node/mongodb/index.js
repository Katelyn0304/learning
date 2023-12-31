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

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // eq (equal to)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    const courses = await Course
        // .find({ price: 10 })
        // .find({ price: { $gte:10, $lte:20 } })
        // .find({ price: { $in: [10, 15, 20] } })

        .find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        // .count();

        // and or object
        // .find()
        // .or([ { author: 'Mosh' }, { isPublished: true } ])
        // .and([])

        // Starts with Mosh
        // .find({ author: /^Mosh/ })

        // Ends with Hamedani
        // .find({ author:  /Hamedani$/i }) // i makes it insensitive

        // Contains Mosh
        // .find({ author: /.*Mosh.*/i })

    console.log(courses);
}

getCourses();