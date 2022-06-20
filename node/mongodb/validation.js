const mongoose = require('mongoose');
const delay = require('delay');

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
        enum: ['web', 'mobile', 'network'], // it must has one of them, or it will get error
        lowercase: true,
        // uppercase: true,
        trim: true // remove the padding around the string
    },
    author: String,
    // required and validator is different from the space
    tags: { // the course should have at least one tag
        type: Array,
        validate: {
            validator: async function(v) {
                await delay(4000);
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
        max: 200,
        set: v => Math.round(v), // 儲存的時候四捨五入
        get: v => Math.round(v) // 讀取的時候四捨五入
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: [1],
        isPublished: true,
        price: 15.2
    });
    
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

createCourse();