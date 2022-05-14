const express = require("express");
const app = express();
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');

// express.json() is a middleware function just like logger, its architecture is also like logger.
app.use(express.json());

// Speaking of middleware function, there are two middleware functions we had already seen.
// One is app.use(express.json()), and the other is (req, res) =>

app.use(logger);

app.use(authenticate);

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.listen(3000, () => console.log(`Listening on port 3000...`));