const EventEmitter = require("events");
const emitter = new EventEmitter();

// register a listener
emitter.on('messageLogged', function(arg1, arg2) {
    console.log('Listener called', arg1, arg2);
});

// raise an event
emitter.emit('messageLogged', {id:1, url:'http://'}, {id:2, url:'https://'});