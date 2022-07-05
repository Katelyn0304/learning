const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model('Test', Schema);

router.post('/', async (req, res) => {
    console.log('receive post');
    const test = new Test({name: req.body.name});
    console.log(req);
    await test.save();
});

module.exports = router;