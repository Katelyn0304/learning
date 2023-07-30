const winston = require('winston');

function errorhandler(err, req, res, next) {
    winston.error(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed.');
}

module.exports = errorhandler;