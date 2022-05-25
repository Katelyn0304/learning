const p_resolve = Promise.resolve({id: 1});
p_resolve.then(result => console.log(result));

const p_reject = Promise.reject(new Error('reason for rejection...'));
p_reject.catch(error => console.log(error));

/*------------------------------------------------------------------------------*/

// This is what the real asynchronous does.
// When the waiter get an order from p1 and send it into kitchen, he immediately goes to p2.

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000); // Try changing 2000 to 4000
});

// When all the promises are resolved in the array, it will create a new promise.
// Then try changing all to race, new promise will be built when one of the promises was done.
Promise.all([p1, p2])
    .then(result => console.log(result));