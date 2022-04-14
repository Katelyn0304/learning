function log(message) {
    // Sent an http reguest
    console.log(message);
}

function log2(name) {
    console.log("hi " + name);
}

// export two objects
module.exports.loggg = log;
module.exports.log22 = log2;

// Question: How to export an object which has multiple methods ?