// The reason why we use callbacks, promises, async/await is that
// for example, if we write down a code to get data in database, it may require few seconds.
// And it will cause to when we run our code, the data has not prepared, getting an undefined result.

// Like this

const user = getUser(1);
console.log(user); // This will execute before return.

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        return { id: id, gitHubUsername: 'Mosh'};
    }, 2000);
}