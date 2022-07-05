const {Person, schema} = require('../models/personal_case');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req, res) => {
    const { error } = schema.validate(_.pick(req.body, [
        'id_number',
        'name',
        'birth',
        'cause',
        'against',
        'userId'
    ]));
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');
    
    const person = new Person({
        id_number: req.body.id_number,
        name: req.body.name,
        birth: req.body.birth,
        cause: req.body.cause,
        against: req.body.against,
        user: {
            _id: user._id,
            code_name: user.code_name
        }
    });

    await person.save();
    
    res.send(person);
  });

module.exports = router;