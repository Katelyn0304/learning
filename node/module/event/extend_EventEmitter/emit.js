const EventEmitter = require("events");

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', {id:1, url:'http://'}); // Is "this" an object of Logger ?
    }
}

console.log(EventEmitter);
console.log(typeof(Logger));

module.exports = Logger;