const {Person, schema} = require('../models/personal_case');
const {User} = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/',auth, async (req, res) => {
    const a = await Person.find();

    // const data_l = []
    // for (i in a) {
    //     if (a[i].created_by._id !== req.user._id) {
    //         for (j in a[i].lawyer) {
    //             if (a[i].lawyer[j]._id === req.user._id) {
    //                 data_l.push(a[i]);
    //             }
    //         }
    //     }
    // }
    // const data_c = await Person.find({ "created_by._id": req.user._id });
    // const data = data_l.concat(data_c);

    const result = [];
    for (i in a) {
        if (a[i].lawyer.find( law => law._id === req.user._id)) {
            result.push(a[i]);
        }
        else {
            if (a[i].created_by._id === req.user._id) {
                result.push(a[i]);
            }
        }
    }
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    const { error } = schema.validate(_.pick(req.body, [
        'id_number',
        'name',
        'birth',
        'cause',
        'against',
        'lawyer'
    ]));
    if (error) return res.status(400).send(error.details[0].message);

    const user_array = []
    for (i in req.body.lawyer) {
        const code_name = req.body.lawyer[i].code_name;
        const user = await User.findOne({ code_name: code_name });
        if (!user) return res.status(400).send('Invalid user.');
        const userObject = {
            _id: user._id,
            name: user.name,
            code_name: user.code_name
        };
        user_array.push(userObject);
    }

    const founder = await User.findById(req.user._id);
    
    const person = new Person({
        id_number: req.body.id_number,
        name: req.body.name,
        birth: req.body.birth,
        cause: req.body.cause,
        against: req.body.against,
        lawyer: user_array,
        created_by: {
            _id: founder._id,
            name: founder.name
        }
    });

    await person.save();  
    res.send(person);
});

module.exports = router;