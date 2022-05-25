console.log('Before'); // This is a sync function

// This is an async function
setTimeout(() => {
    console.log('Reading a user from a database...');
}, 2000);

console.log('After'); // This is a sync function

// The code will execute line 1, then line 5, after 2 seconds, line 3.
// asynchronous function is like scheduling a task to be performed in the future.