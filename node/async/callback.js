getUser(1, (user) => {
    console.log('User', user);
});

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'Mosh'});
    }, 2000);
}