const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// the port on hosting environment is presented, and 3000 is an arbitrary port.
// we use process.env.port to get the port on hosting environment.
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));