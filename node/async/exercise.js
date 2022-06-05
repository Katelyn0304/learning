async function notifyCustomer() {
    try {
        const customer = await getCustomer(1);
        console.log('Customer: ', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            await sendEmail(customer.email, movies);
            console.log('Email sent...');
        }
    }
    catch (err) {
        console.log('Error', err.message);
    }
}
notifyCustomer();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                throw new Error('Can not connect to the database...');
                resolve({ 
                    id: id, 
                    name: 'Mosh Hamedani', 
                    isGold: true, 
                    email: 'email' 
                });
            }
            catch (err) {
                reject('Error: ', err.message);
            }
        }, 4000); 
    }); 
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    });
}