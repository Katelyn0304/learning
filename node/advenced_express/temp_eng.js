const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

// Type localhost:3000 on browser.
app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' });
});

app.listen(3000, () => console.log(`Listening on port 3000...`));