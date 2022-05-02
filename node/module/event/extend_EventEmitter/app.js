const Logger = require('./logger');
const logger = new Logger();

console.log(typeof(Logger));
console.log(typeof(logger));

logger.on('messageLogged', function(arg) {
    console.log('Listener called', arg);
});

logger.log('message');