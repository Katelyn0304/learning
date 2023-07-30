const {Test, schema, IdSchema} = require('../models/test');
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
        'against'
    ]));
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.find({ code_name_1: req.body.code_name_1 }, { code_name_2: req.body.code_name_2 });
    if (!user) return res.status(400).send('Invalid user.');

    const { err1 } = IdSchema.validate(user[0]._id);
    if (err1) return res.status(400).send(error.details[0].message);

    const { err2 } = IdSchema.validate(user[1]._id);
    if (err2) return res.status(400).send(error.details[0].message);
    
    const test = new Test({
        id_number: req.body.id_number,
        name: req.body.name,
        birth: req.body.birth,
        cause: req.body.cause,
        against: req.body.against,
        user: {
            _id: user[0]._id,
            code_name: user[0].code_name,
            name: user[0].name
        },
        user: {
            _id: user[1]._id,
            code_name: user[1].code_name,
            name: user[1].name
        }
    });

    await test.save();
    
    res.send(test);
  });

module.exports = router;

/*
[{ id: 1, user: {
    _id: user._id,
    code_name: user.code_name,
    name: user.name
}},
{ id: 2, user: {
    _id: user._id,
    code_name: user.code_name,
    name: user.name
}},
{ id: 3, user: {
    _id: user._id,
    code_name: user.code_name,
    name: user.name
}}]
*/