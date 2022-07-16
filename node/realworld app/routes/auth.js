const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi')
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = schema.validate(_.pick(req.body, ['email', 'password']));
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send('Sign in successfully.');
});

const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

module.exports = router;