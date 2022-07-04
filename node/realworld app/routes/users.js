const {User, schema} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req, res) => {
    const { error } = schema.validate(_.pick(req.body, ['id_number', 'name', 'birth', 'email', 'phone', 'code_name', 'level', 'password']));
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ id_number: req.body.id_number }); // if !user, user=null
    if (user) return res.status(400).send('User already registered.');
  
    user = new User(_.pick(req.body, ['id_number', 'name', 'birth', 'email', 'phone', 'code_name', 'level', 'password']));
    await user.save();

    res.send(user);
  });

module.exports = router;