const _ = require('lodash');

const array = ['a', 'b', 'c'];

for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}

const a = [{id: 123, name: "aaa"}, {id: 123, name: "aaa"}];

const b = a.filter((scape, index, arr) => {
    return arr.findIndex(s => scape.id === s.id) === index;
  });
  
console.log(b);