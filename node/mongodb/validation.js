const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'] // it must has one of them, or it will get error
    },
    author: String,
    // required and validator is different from the space
    tags: { // the course should have at least one tag
        type: Array,
        validate: {
            validator: function(v) {
                await delay(3);
                return v && v.length > 0; // && = 邏輯閘的and
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        // if isPublished is true => price is required
        // here can not use ()=>{}, because 'this' is unavailable
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Mosh',
        tags: [1],
        isPublished: true,
        price: 15
    });
    
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}

createCourse();