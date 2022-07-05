const {Company, schema} = require('../models/company_case');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req, res) => {
    const { error } = schema.validate(_.pick(req.body, [
        'company_number',
        'name',
        'cause',
        'against',
        'userId'
    ]));
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');
    
    const company = new Company({
        company_number: req.body.company_number,
        name: req.body.name,
        cause: req.body.cause,
        against: req.body.against,
        user: {
            _id: user._id,
            code_name: user.code_name
        }
    });

    await company.save();
    
    res.send(company);
  });

module.exports = router;