const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// what you type is what you get
app.get('/api/courses/:abc',(req, res) => {
    res.send(req.params.abc);
});

app.get('/api/posts/:year/:month',(req, res) => {
    res.send(req.params); // replace params with query, at the end of the original url add ?_=_ will get _:_
});

app.listen(3000, () => console.log('Listening on port 3000...'));