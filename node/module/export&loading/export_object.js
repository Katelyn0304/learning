function log1(message) {
    // Sent an http reguest
    console.log(message);
}

function log2(name) {
    console.log("hi " + name);
}

function ili(name) {
    console.log("我愛柔兒");
}

// export object with two methods
module.exports.log = {log1, log2};

console.log(typeof({log1}));

// Question: How to export an object which has multiple methods ?    [OK]