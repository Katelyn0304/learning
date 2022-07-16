const {User, schema} = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if (!verifyPassword) return res.status(400).send('Invalid password.');
    res.send(user);
});

router.post('/', [auth, admin], async (req, res) => {
    const { error } = schema.validate(_.pick(req.body, [
        'id_number',
        'name',
        'birth',
        'email',
        'phone',
        'code_name',
        'password',
        'level'
    ]));
    if (error) return res.status(400).send(error.details[0].message);
        
    let user = await User.findOne({ id_number: req.body.id_number }); // if !user, user=null
    if (user) return res.status(400).send('User already registered.');
    
    user = new User(_.pick(req.body, [
        'id_number',
        'name',
        'birth',
        'email',
        'phone',
        'code_name',
        'password',
        'level'
    ]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    res.send(user);
});

module.exports = router;