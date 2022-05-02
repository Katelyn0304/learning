const EventEmitter = require("events");
const emitter = new EventEmitter();

console.log(typeof(EventEmitter)); // in video, it is a class
console.log(typeof(emitter));

// register a listener
emitter.on('messageLogged', function() {
    console.log('Listener called');
});

// raise an event
emitter.emit('messageLogged');