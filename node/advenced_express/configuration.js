const config = require('config');

// if we set NODE_ENV=production, it will change to production.json file
console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password')); // set app_password=1234 at first