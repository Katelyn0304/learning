const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground-es')
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
  authors: [authorSchema] 
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .select('name authors');
  console.log(courses);
}

async function addAuthor(courseID, author) {
    const course = await Course.findById(courseID);
    course.authors.push(author);
    course.save();
}

async function deleteAuthor(courseID, authorID) {
    const course = await Course.findById(courseID);
    const author = course.authors.id(authorID);
    author.remove();
    course.save();
}

/*createCourse('Node Course', [
    new Author({ name: 'Mosh' }),
    new Author({ name: 'John' })
]);*/

// addAuthor('62b4935e94be37cb6ec4df3d', new Author({ name: 'Amy' }));

// deleteAuthor('62b4935e94be37cb6ec4df3d', '62b4946709453c028165295a');

listCourses();