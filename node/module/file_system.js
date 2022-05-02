const fs = require("fs");

// Synchronous
const files = fs.readdirSync('./'); // or '../'
console.log(files);

// Asynchronous
fs.readdir('./', function(err, files) { // replace ./ with $ will see an error
    if (err) console.log('Error', err);
    else console.log('Result', files);
});