const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground-e')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .select('name author.name');
  console.log(courses);
}

// query first
async function updateAuthor_q(courseID) {
  const course = await Course.findById(courseID);
  course.author.name = 'Mosh Hamedani';
  course.save();
}

// update first
async function updateAuthor_u(courseID) {
  await Course.updateOne({ _id: courseID }, {
    $set: {
      'author.name': 'John Smith'
    }
  });
}

async function deleteAuthor(courseID) {
  await Course.updateOne({ _id: courseID }, {
    $unset: {
      'author': ''
    }
  });
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));

// updateAuthor_q('62b489903d24993b44be47d1');

// updateAuthor_u('62b489903d24993b44be47d1');

// listCourses();

deleteAuthor('62b489903d24993b44be47d1');